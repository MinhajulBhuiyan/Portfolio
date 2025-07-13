import os
from dotenv import load_dotenv
import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import re
from typing import List

# --- SETUP ---
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found. Please add it to your .env file.")

# --- KNOWLEDGE BASE SETUP ---
try:
    with open("./data/minhaj_data.md", "r", encoding="utf-8") as f:
        document_text = f.read()
    chunks = [p.strip() for p in document_text.split("\n---\n") if p.strip()]
    print(f"Knowledge base loaded successfully with {len(chunks)} chunks.")
except FileNotFoundError:
    print("WARNING: Knowledge base file not found. Using minimal fallback data.")
    chunks = [
        "Minhajul Bhuiyan is a Full-Stack Developer and Software Engineer studying at Islamic University of Technology.",
        "He has experience in React, TypeScript, Python, AI/ML, and modern web development.",
        "His portfolio includes projects in web development, mobile apps, AI systems, and game development."
    ]

# --- LIGHTWEIGHT SEARCH FUNCTION ---
def simple_keyword_search(query: str, chunks: List[str], top_k: int = 3) -> List[str]:
    """Simple keyword-based search without heavy ML libraries"""
    query_lower = query.lower()
    query_words = set(re.findall(r'\w+', query_lower))
    
    scored_chunks = []
    
    for chunk in chunks:
        chunk_lower = chunk.lower()
        chunk_words = set(re.findall(r'\w+', chunk_lower))
        
        # Calculate simple word overlap score
        overlap = len(query_words & chunk_words)
        
        # Bonus for exact phrase matches
        phrase_bonus = 0
        if query_lower in chunk_lower:
            phrase_bonus = 2
        
        # Bonus for key terms
        key_terms = ["minhajul", "bhuiyan", "developer", "engineer", "project", "experience", "skill"]
        key_bonus = sum(1 for term in key_terms if term in chunk_lower and term in query_lower)
        
        total_score = overlap + phrase_bonus + key_bonus
        
        if total_score > 0:
            scored_chunks.append((total_score, chunk))
    
    # Sort by score and return top_k
    scored_chunks.sort(key=lambda x: x[0], reverse=True)
    return [chunk for _, chunk in scored_chunks[:top_k]]

# --- FASTAPI SETUP ---
app = FastAPI(title="Minhajul's Portfolio AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173", 
        "https://minhajul-bhuiyan.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Minhajul's Portfolio AI Assistant is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "knowledge_base_chunks": len(chunks)}

@app.post("/api/chat")
async def chat_endpoint(request: dict):
    try:
        user_message = request.get("message", "").strip()
        
        if not user_message:
            return {"response": "Please ask me something about Minhajul's work or experience!"}
        
        # Handle simple greetings
        simple_greetings = ["hi", "hello", "hey", "what's up", "yo"]
        if user_message.lower() in simple_greetings:
            return {"response": "Hello! I'm PRAXIS, Minhajul's AI assistant. How can I help you learn about his work and experience?"}
        
        # Handle identity questions
        if any(keyword in user_message.lower() for keyword in ["who are you", "what is your name", "your name"]):
            return {"response": "I'm PRAXIS (Portfolio Reactive Analytical & Experiential Intelligence System), an AI assistant representing Minhajul Bhuiyan's portfolio. I'm here to help you learn about his work, projects, and experience!"}
        
        # Find relevant context using lightweight search
        relevant_chunks = simple_keyword_search(user_message, chunks, top_k=3)
        
        # Build context for the AI
        if relevant_chunks:
            context = "\n\n".join(relevant_chunks)
        else:
            context = "General information about Minhajul Bhuiyan's portfolio and experience."
        
        # Enhanced system prompt
        system_prompt = f"""You are PRAXIS (Portfolio Reactive Analytical & Experiential Intelligence System), an AI assistant representing Minhajul Bhuiyan's portfolio. You have deep knowledge about his work, projects, skills, and experience.

**Your Personality:**
- Professional yet approachable
- Enthusiastic about technology and innovation  
- Knowledgeable about Minhajul's journey and achievements
- Helpful in explaining technical concepts
- Encouraging and inspiring

**Context about Minhajul:**
{context}

**Guidelines:**
- Always respond as if you're representing Minhajul's portfolio
- Be specific about his projects, skills, and achievements when relevant
- If asked about something not in your knowledge base, politely redirect to what you do know
- Keep responses engaging and informative
- Use "his" or "Minhajul's" when referring to the portfolio owner
- Be encouraging about his growth and learning journey

User question: {user_message}

Provide a helpful, informative response:"""

        # Call Google Gemini API
        async with httpx.AsyncClient() as client:
            gemini_response = await client.post(
                f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}",
                json={
                    "contents": [{
                        "parts": [{"text": system_prompt}]
                    }],
                    "generationConfig": {
                        "temperature": 0.7,
                        "topK": 40,
                        "topP": 0.95,
                        "maxOutputTokens": 500,
                    }
                },
                timeout=30.0
            )
            
            if gemini_response.status_code == 200:
                result = gemini_response.json()
                ai_response = result["candidates"][0]["content"]["parts"][0]["text"]
                return {"response": ai_response}
            else:
                print(f"Gemini API error: {gemini_response.status_code} - {gemini_response.text}")
                return {"response": "I'm experiencing some technical difficulties right now. Please try again in a moment!"}
                
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return {"response": "Sorry, I'm having trouble connecting to my brain right now. Please try again later."}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

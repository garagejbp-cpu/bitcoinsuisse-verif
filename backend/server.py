from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from contextlib import asynccontextmanager
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL")
client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client.bitcoin_suisse_clone
        logger.info("Connecté à MongoDB avec succès")
        yield
    finally:
        if client:
            client.close()
            logger.info("Connexion MongoDB fermée")

app = FastAPI(title="Bitcoin Suisse Clone API", lifespan=lifespan)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    """Point de terminaison de vérification de santé"""
    return {
        "status": "en bonne santé",
        "service": "Bitcoin Suisse Clone API",
        "version": "1.0.0"
    }

@app.post("/api/contact/submit")
async def submit_contact(contact_data: dict):
    """Soumission du formulaire de contact - placeholder pour future intégration Google Sheets"""
    logger.info(f"Soumission du formulaire de contact reçue: {contact_data.get('email', 'inconnu')}")
    
    # Valider les champs requis
    required_fields = ['first_name', 'last_name', 'email', 'phone', 'type', 'category', 'subject', 'description']
    for field in required_fields:
        if field not in contact_data or not contact_data[field]:
            raise HTTPException(status_code=400, detail=f"Champ requis manquant: {field}")
    
    # TODO: Intégrer avec Google Sheets
    # Pour l'instant, retourner juste un succès
    return {
        "success": True,
        "message": "Formulaire de contact soumis avec succès. Nous vous recontacterons bientôt !",
        "data": contact_data
    }

@app.get("/api/news")
async def get_news():
    """Obtenir les articles d'actualité"""
    news_articles = [
        {
            "id": 1,
            "title": "Bitcoin Suisse Active le Trading pour les Protocoles Haute Performance Monad et Hyperliquid",
            "description": "Zoug, Suisse, 16 décembre 2025 – Bitcoin Suisse est heureux d'annoncer la disponibilité du trading pour Monad (MON) et Hyperliquid (HYPE), deux protocoles Layer 1 récemment lancés représentant des avancées techniques significatives dans les performances blockchain.",
            "category": "général",
            "date": "15 déc. 2024",
            "read_time": "4 Min",
            "image": "https://assets.bitcoinsuisse.com/schiscms/assets/desktop_HYPE_and_MON_Listing_a1145471d4.webp"
        },
        {
            "id": 2,
            "title": "Bitcoin Suisse Nomme Roman Przibylla comme Directeur Client pour Accélérer les Activités Commerciales",
            "description": "Zoug, Suisse, 13 novembre 2025 – Bitcoin Suisse annonce un renforcement supplémentaire de son Comité de Direction avec la nomination de Roman Przibylla en tant que Directeur Client (CCO) du Groupe Bitcoin Suisse à compter du 1er décembre 2025.",
            "category": "général",
            "date": "12 nov. 2024",
            "read_time": "5 Min",
            "image": "https://assets.bitcoinsuisse.com/schiscms/assets/Bitcoin_Suisse_Appoints_Roman_Przibylla_as_Chief_Client_Officer_to_Accelerate_Commercial_Activities_660d851402.png"
        },
        {
            "id": 3,
            "title": "Bitcoin Suisse (Europe) AG, Solstice et Obol Alimentent l'Infrastructure de Validateur Souverain pour LTIN",
            "description": "Vaduz, Liechtenstein, 3 novembre 2025 – Bitcoin Suisse est fier d'annoncer son rôle en tant qu'opérateur de validateur fondateur pour le Liechtenstein Trust Integrity Network (LTIN), une initiative d'infrastructure blockchain soutenue par l'État.",
            "category": "général",
            "date": "2 nov. 2024",
            "read_time": "5 Min",
            "image": "https://assets.bitcoinsuisse.com/schiscms/assets/Bitcoin_Suisse_Europe_AG_Solstice_and_Obol_Powering_Sovereign_Validator_Infrastructure_for_LTIN_b85704d3b5.png"
        }
    ]
    return {"news": news_articles}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

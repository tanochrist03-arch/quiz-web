import os
from flask import Flask, jsonify, request, render_template, session
from core import generer_partie, evaluer_reponses, obtenir_categories

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "cle_studio_million_master_2026")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/healthz")
def healthz():
    return jsonify({"status": "healthy"}), 200

@app.route("/api/categories", methods=["GET"])
def lister_categories():
    """Expose la liste des disciplines accessibles au joueur."""
    return jsonify({"categories": obtenir_categories()})

@app.route("/api/nouvelle-partie", methods=["GET"])
def nouvelle_partie():
    """Génère la manche selon la catégorie sélectionnée (ou toutes par défaut)."""
    categorie_choisie = request.args.get("cat", "toutes")
    questions = generer_partie(categorie=categorie_choisie)
    
    session["questions_en_cours"] = questions

    # Transmission publique épurée de la réponse exacte
    questions_publiques = [
        {
            "id": q["id"],
            "categorie": q.get("categorie"),
            "question": q["question"],
            "options": q["options"]
        }
        for q in questions
    ]

    return jsonify({"questions": questions_publiques})

@app.route("/api/valider", methods=["POST"])
def valider():
    questions = session.get("questions_en_cours")
    if not questions:
        return jsonify({"erreur": "La session du plateau a expiré. Veuillez reprendre place."}), 400

    reponses_joueur = request.get_json() or {}
    resultat = evaluer_reponses(questions, reponses_joueur)
    session.pop("questions_en_cours", None)

    return jsonify(resultat)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
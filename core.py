import random

QUESTIONS_PAR_MANCHE = 10

CATEGORIES_DISPONIBLES = [
    {"id": "toutes", "nom": "🌐 Défi Intégral (Tous thèmes)"},
    {"id": "sport", "nom": "⚽ Athlétisme, Stratégie & Sports Mondiaux"},
    {"id": "sciences", "nom": "🧬 Sciences, Réseaux & Architecture PC"},
    {"id": "histoire_geo", "nom": "🌍 Histoire, Géographie & Civilisations"},
    {"id": "arts_culture", "nom": "🎭 Littérature, Philosophie & Grands Arts"}
]

QUESTION_BANK = [
    # SPORT
    {
        "id": 1,
        "categorie": "sport",
        "question": "En 1992, quelle sélection de basket-ball a marqué l'histoire aux JO sous le nom de 'Dream Team' ?",
        "options": ["La Croatie", "Les États-Unis", "La Lituanie", "L'URSS"],
        "reponse": 1,
        "anecdote": "Menée par Jordan et Magic Johnson, cette équipe olympique a battu ses adversaires avec 44 points d'écart moyen."
    },
    {
        "id": 2,
        "categorie": "sport",
        "question": "Quel pays a remporté la Coupe d'Afrique des Nations (CAN) 2023 organisée en Côte d'Ivoire ?",
        "options": ["Le Nigeria", "La Côte d'Ivoire", "Le Sénégal", "L'Égypte"],
        "reponse": 1,
        "anecdote": "Les Éléphants ont conquis leur 3e étoile en battant le Nigeria 2-1 au stade d'Ébimpé."
    },
    {
        "id": 3,
        "categorie": "sport",
        "question": "Quel athlète détient les records du monde du 100m (9s58) et du 200m (19s19) établis à Berlin en 2009 ?",
        "options": ["Carl Lewis", "Tyson Gay", "Usain Bolt", "Yohan Blake"],
        "reponse": 2,
        "anecdote": "Usain Bolt a enregistré une vitesse de pointe de 44,72 km/h lors de cette course."
    },
    {
        "id": 4,
        "categorie": "sport",
        "question": "En NBA, quel joueur est devenu le meilleur marqueur de l'histoire en dépassant Kareem Abdul-Jabbar ?",
        "options": ["Kobe Bryant", "LeBron James", "Stephen Curry", "Michael Jordan"],
        "reponse": 1,
        "anecdote": "LeBron James a franchi la barre historique des 38 387 points le 7 février 2023."
    },
    {
        "id": 5,
        "categorie": "sport",
        "question": "Quelle nation détient le record du plus grand nombre de Coupes du Monde de football avec 5 étoiles ?",
        "options": ["L'Allemagne", "L'Italie", "Le Brésil", "L'Argentine"],
        "reponse": 2,
        "anecdote": "Le Brésil a été sacré champion du monde en 1958, 1962, 1970, 1994 et 2002."
    },
    {
        "id": 6,
        "categorie": "sport",
        "question": "Sur quelle surface mythique le tournoi du Grand Chelem de Wimbledon est-il disputé ?",
        "options": ["Terre battue", "Gazon naturel", "Résine synthétique", "Parquet vitrifié"],
        "reponse": 1,
        "anecdote": "Le gazon de Wimbledon est tondu à une hauteur réglementaire stricte de 8 millimètres."
    },
    {
        "id": 7,
        "categorie": "sport",
        "question": "Quel club a remporté la Ligue des Champions de l'UEFA 2024 en battant Dortmund à Wembley ?",
        "options": ["Bayern Munich", "Real Madrid", "Manchester City", "Paris Saint-Germain"],
        "reponse": 1,
        "anecdote": "Le Real Madrid a soulevé sa 15e couronne européenne, un record absolu."
    },
    {
        "id": 8,
        "categorie": "sport",
        "question": "Dans quel art martial japonais cherche-t-on à projeter ou immobiliser au sol selon la 'voie de la souplesse' ?",
        "options": ["Le Karaté", "Le Taekwondo", "Le Judo", "Le Kendo"],
        "reponse": 2,
        "anecdote": "Fondé en 1882 par Jigoro Kano, le judo a été introduit aux Jeux Olympiques dès 1964."
    },

    # SCIENCES & RÉSEAUX
    {
        "id": 9,
        "categorie": "sciences",
        "question": "Quel protocole réseau sécurisé opère nativement sur le port 443 pour chiffrer le trafic web ?",
        "options": ["HTTP", "HTTPS", "SSH", "SNMP"],
        "reponse": 1,
        "anecdote": "HTTPS s'appuie sur TLS pour garantir la confidentialité et l'intégrité des échanges web."
    },
    {
        "id": 10,
        "categorie": "sciences",
        "question": "Quel composant convertit le courant secteur 220V alternatif en tensions continues 12V, 5V et 3.3V ?",
        "options": ["La carte mère", "Le bloc d'alimentation (PSU)", "Le processeur", "Le SSD"],
        "reponse": 1,
        "anecdote": "Le bloc d'alimentation régule la puissance délivrée à l'ensemble des rails de votre configuration."
    },
    {
        "id": 11,
        "categorie": "sciences",
        "question": "Dans le modèle OSI, à quelle couche intervient le routage logique des adresses IP ?",
        "options": ["Couche 2 (Liaison)", "Couche 3 (Réseau)", "Couche 4 (Transport)", "Couche 7 (Application)"],
        "reponse": 1,
        "anecdote": "Les routeurs opèrent en couche 3 pour acheminer les paquets entre sous-réseaux distincts."
    },
    {
        "id": 12,
        "categorie": "sciences",
        "question": "Quel algorithme de chiffrement symétrique standardisé en 2001 emploie des blocs de 128 bits ?",
        "options": ["DES", "RSA", "AES", "Blowfish"],
        "reponse": 2,
        "anecdote": "L'AES est le standard mondial utilisé pour protéger les données confidentielles bancaires et gouvernementales."
    },
    {
        "id": 13,
        "categorie": "sciences",
        "question": "Quel gaz compose à lui seul environ 78 % de l'atmosphère terrestre ?",
        "options": ["L'Oxygène", "Le Diazote", "L'Argon", "Le Gaz carbonique"],
        "reponse": 1,
        "anecdote": "Le diazote (N2) est un gaz inerte dominant largement devant l'oxygène (21%)."
    },
    {
        "id": 14,
        "categorie": "sciences",
        "question": "Quel outil open-source est la référence mondiale pour cartographier les hôtes et ports d'un réseau ?",
        "options": ["Nmap", "Wireshark", "Putty", "FileZilla"],
        "reponse": 0,
        "anecdote": "Créé en 1997 par Gordon Lyon, Nmap permet la découverte de réseau et l'audit de sécurité."
    },
    {
        "id": 15,
        "categorie": "sciences",
        "question": "Quelle planète possède la vitesse de rotation axiale la plus rapide (moins de 10 heures) ?",
        "options": ["Mars", "Jupiter", "Saturne", "Vénus"],
        "reponse": 1,
        "anecdote": "Jupiter tourne sur elle-même en 9h55, ce qui lui donne un aplatissement visible aux pôles."
    },
    {
        "id": 16,
        "categorie": "sciences",
        "question": "Quelle particule subatomique de charge neutre compose le noyau aux côtés des protons ?",
        "options": ["L'Électron", "Le Positron", "Le Neutron", "Le Photon"],
        "reponse": 2,
        "anecdote": "Découvert par James Chadwick en 1932, le neutron stabilise le noyau via l'interaction forte."
    },

    # HISTOIRE & GÉOGRAPHIE
    {
        "id": 17,
        "categorie": "histoire_geo",
        "question": "Quelle ville a été proclamée capitale politique de la Côte d'Ivoire en 1983 ?",
        "options": ["Abidjan", "Yamoussoukro", "Grand-Bassam", "Bouaké"],
        "reponse": 1,
        "anecdote": "Yamoussoukro abrite la Basilique Notre-Dame de la Paix, l'un des plus hauts édifices religieux du monde."
    },
    {
        "id": 18,
        "categorie": "histoire_geo",
        "question": "Quelle grande civilisation a édifié la forteresse du Machu Picchu au XVe siècle ?",
        "options": ["Les Aztèques", "Les Mayas", "Les Incas", "Les Toltèques"],
        "reponse": 2,
        "anecdote": "Construit sous l'empereur Pachacútec à 2 430 m d'altitude au Pérou, le site a été redécouvert en 1911."
    },
    {
        "id": 19,
        "categorie": "histoire_geo",
        "question": "En quelle année le Mur de Berlin est-il tombé, marquant la fin de la Guerre Froide ?",
        "options": ["1987", "1989", "1991", "1993"],
        "reponse": 1,
        "anecdote": "La chute s'est produite dans la nuit du 9 novembre 1989, amorçant la réunification allemande."
    },
    {
        "id": 20,
        "categorie": "histoire_geo",
        "question": "Quel fleuve africain est réputé pour traverser deux fois l'équateur le long de ses 4 700 km ?",
        "options": ["Le Nil", "Le Zambèze", "Le Congo", "Le Niger"],
        "reponse": 2,
        "anecdote": "Le fleuve Congo est aussi le plus profond du monde, atteignant plus de 220 mètres de profondeur."
    },
    {
        "id": 21,
        "categorie": "histoire_geo",
        "question": "Quel détroit maritime sépare la côte sud de l'Espagne de la pointe nord du Maroc ?",
        "options": ["Le Bosphore", "Le détroit d'Ormuz", "Le détroit de Gibraltar", "Le canal de Suez"],
        "reponse": 2,
        "anecdote": "Gibraltar fait communiquer l'Océan Atlantique et la Mer Méditerranée sur une largeur de 14 km."
    },
    {
        "id": 22,
        "categorie": "histoire_geo",
        "question": "Qui fut le tout premier empereur de la Rome antique ?",
        "options": ["Jules César", "Auguste", "Néron", "Tibère"],
        "reponse": 1,
        "anecdote": "Octave a reçu le titre sacré d'Auguste en 27 av. J.-C., fondant ainsi le principat romain."
    },
    {
        "id": 23,
        "categorie": "histoire_geo",
        "question": "Quel est le point culminant du continent africain à 5 895 mètres ?",
        "options": ["Mont Kenya", "Kilimandjaro", "Mont Cameroun", "Mont Stanley"],
        "reponse": 1,
        "anecdote": "Le Kilimandjaro est un volcan majestueux situé au nord-est de la Tanzanie."
    },
    {
        "id": 24,
        "categorie": "histoire_geo",
        "question": "En quelle année Constantinople a-t-elle été prise par l'Empire ottoman ?",
        "options": ["1350", "1453", "1492", "1517"],
        "reponse": 1,
        "anecdote": "La prise menée par Mehmed II en 1453 marque traditionnellement la fin du Moyen Âge."
    },

    # ARTS & CULTURE
    {
        "id": 25,
        "categorie": "arts_culture",
        "question": "Qui a rédigé le célèbre traité de philosophie politique 'Le Prince' publié en 1532 ?",
        "options": ["Thomas More", "Nicolas Machiavel", "Érasme", "Jean Bodin"],
        "reponse": 1,
        "anecdote": "Machiavel y analyse avec un froid réalisme la gestion et la conservation du pouvoir d'État."
    },
    {
        "id": 26,
        "categorie": "arts_culture",
        "question": "Quel maître flamand a peint le chef-d'œuvre baroque 'La Ronde de nuit' (1642) ?",
        "options": ["Johannes Vermeer", "Rembrandt", "Frans Hals", "Jan van Eyck"],
        "reponse": 1,
        "anecdote": "Rembrandt s'est imposé par sa virtuosité dans l'usage du clair-obscur et la dynamique collective."
    },
    {
        "id": 27,
        "categorie": "arts_culture",
        "question": "Quel dramaturge nigérian est le premier lauréat africain du Prix Nobel de littérature (1986) ?",
        "options": ["Chinua Achebe", "Wole Soyinka", "Amadou Hampâté Bâ", "Ngugi wa Thiong'o"],
        "reponse": 1,
        "anecdote": "Wole Soyinka a été couronné pour sa vaste poétique et son regard engagé sur le monde contemporain."
    },
    {
        "id": 28,
        "categorie": "arts_culture",
        "question": "Quelle symphonie de Beethoven intègre les vers de 'L'Ode à la joie' ?",
        "options": ["La 3e Symphonie", "La 5e Symphonie", "La 7e Symphonie", "La 9e Symphonie"],
        "reponse": 3,
        "anecdote": "Beethoven composa ce monument en état de surdité complète, achevé en 1824."
    },
    {
        "id": 29,
        "categorie": "arts_culture",
        "question": "Quel sculpteur et peintre a peint la fresque du plafond de la Chapelle Sixtine ?",
        "options": ["Léonard de Vinci", "Raphaël", "Michel-Ange", "Donatello"],
        "reponse": 2,
        "anecdote": "Michel-Ange a exécuté cette fresque sous la commande du pape Jules II entre 1508 et 1512."
    },
    {
        "id": 30,
        "categorie": "arts_culture",
        "question": "Quel auteur a écrit les pièces 'Roméo et Juliette', 'Hamlet' et 'Macbeth' ?",
        "options": ["Molière", "William Shakespeare", "Victor Hugo", "Oscar Wilde"],
        "reponse": 1,
        "anecdote": "Shakespeare a marqué l'époque élisabéthaine et révolutionné le théâtre universel."
    }
]

def obtenir_categories() -> list:
    return CATEGORIES_DISPONIBLES

def generer_partie(categorie: str = "toutes", taille: int = QUESTIONS_PAR_MANCHE) -> list:
    if categorie and categorie != "toutes":
        pool = [q for q in QUESTION_BANK if q.get("categorie") == categorie]
    else:
        pool = list(QUESTION_BANK)

    taille_reelle = min(taille, len(pool))
    return random.sample(pool, taille_reelle)

def attribuer_rang(score: int, total: int) -> str:
    if total == 0:
        return "🌱 Novice Curieux"
    ratio = score / total
    if ratio == 1.0:
        return "🏆 Grand Maître Suprême du Million (Sans-Faute)"
    elif ratio >= 0.8:
        return "🎖️ Érudit d'Élite Hors-Pair"
    elif ratio >= 0.6:
        return "📚 Connaisseur Averti du Plateau"
    elif ratio >= 0.4:
        return "⚡ Candidat Prometteur"
    return "🌱 Novice Curieux"

def evaluer_reponses(questions_manche: list, reponses_utilisateur: dict) -> dict:
    score = 0
    bilan = []

    for q in questions_manche:
        qid = q["id"]
        choix = reponses_utilisateur.get(str(qid))
        est_correct = (choix is not None and int(choix) == q["reponse"])

        if est_correct:
            score += 1

        bilan.append({
            "id": qid,
            "categorie": q.get("categorie", "général"),
            "question": q["question"],
            "options": q["options"],
            "choix_utilisateur": int(choix) if choix is not None else None,
            "bonne_reponse": q["reponse"],
            "bonne_reponse_texte": q["options"][q["reponse"]],
            "est_correct": est_correct,
            "anecdote": q["anecdote"]
        })

    total = len(questions_manche)
    return {
        "score": score,
        "total": total,
        "rang": attribuer_rang(score, total),
        "details": bilan
    }
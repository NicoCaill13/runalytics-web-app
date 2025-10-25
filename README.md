# runalytics-web-appExcellent 👍
Voici une synthèse claire et complète de **tout ce qu’on vient d’acter** concernant le MVP **Runalytics** — à la fois sur la philosophie, les fonctionnalités et le positionnement stratégique.

---

# 🧭 Résumé stratégique — MVP Runalytics

---

## 🎯 Vision

> **Runalytics** est un coach digital intelligent qui analyse ton profil de coureur, évalue la cohérence de tes objectifs et construit un plan d’action réaliste pour les rendre possibles.

C’est la première application qui relie **données physiologiques**, **objectifs multiples** et **analyse rationnelle**, dans une approche claire, crédible et coachée.

---

## 🧩 Philosophie du produit

Runalytics n’impose pas un plan — il **analyse d’abord, explique ensuite, et oriente enfin**.
L’approche repose sur trois étapes fondamentales :

1. **Comprendre le coureur**

   * Analyse de la VMA, FC repos / max, dérive cardiaque, endurance spécifique, volume, fréquence, constance.
   * Diagnostic froid et neutre : “voici où tu en es”.

2. **Évaluer la cohérence de l’objectif**

   * Comparaison entre le potentiel réel (VMA, volume, endurance) et la cible (distance, temps, date).
   * Identification du **gap physiologique** : “il te manque 0.8 km/h de VMA pour rendre cet objectif réaliste”.

3. **Proposer une stratégie de progression**

   * Si l’objectif est atteignable → plan spécifique direct.
   * Si l’objectif est ambitieux → plan de **développement préalable** (ex. “VMA Boost 6 semaines”).
   * Si l’objectif est irréaliste à court terme → **reformulation constructive** (“on le vise dans 3 mois avec montée progressive”).

---

## ⚙️ Fonctionnalités du MVP

1. **Connexion Strava**

   * Synchronisation des activités et récupération des streams.
   * Association automatique des runs à un ou plusieurs objectifs.

2. **Analyse physiologique initiale**

   * Estimation de la **VMA**, de la **FC max**, de la **FC repos**.
   * Déduction des **zones cardio** et du **profil d’endurance spécifique**.
   * L’utilisateur valide ou ajuste ses valeurs.

3. **Création d’un objectif**

   * Choix de la distance (5K, 10K, semi, marathon).
   * Définition du **temps visé**, du **début de préparation** et du **nombre de séances/semaine**.
   * Option “objectif compétiteur” pour les utilisateurs avancés.

4. **Diagnostic coach intelligent**

   * Analyse du ratio vitesse cible / VMA.
   * Évaluation du réalisme (confortable / ambitieux / trop exigeant).
   * Si besoin, proposition d’un **plan de progression intermédiaire** (ex : “améliorer la VMA de 13.7 à 14.5 km/h en 8 semaines”).

5. **Multi-objectifs hiérarchisés**

   * Possibilité de suivre plusieurs préparations (ex : 10K + marathon).
   * Hiérarchisation (`isPrimary`) et gestion de chevauchements temporels.
   * Attribution automatique des séances aux objectifs concernés.

6. **Feedback hebdomadaire intelligent**

   * Synthèse automatique des progrès : volume, ratio EF/Qualité, VMA, endurance, FC moyenne.
   * Analyse factuelle (“ton volume EF est bon”, “ta VMA reste stable”, “ton endurance spécifique progresse”).
   * Feedback neutre et rationnel, sans surcouche motivationnelle artificielle.

---

## 🧠 Positionnement sur le marché

| Axe                 | Runalytics                                         | Concurrents (RunMotion / AI Endurance / V.O2) |
| ------------------- | -------------------------------------------------- | --------------------------------------------- |
| Philosophie         | Analyse & stratégie                                | Plan automatique / IA opaque                  |
| Transparence        | Explique ses décisions                             | Boîte noire                                   |
| Objectifs multiples | ✅ Oui, avec hiérarchisation                        | ❌ Non                                         |
| Coaching            | Réaliste, adaptatif, explicatif                    | Générique ou automatique                      |
| Feedback            | Analyse froide, lucide                             | Motivation simpliste                          |
| Cible               | Coureurs réguliers, orientés performance raisonnée | Grand public ou élite                         |

**Runalytics = le coach rationnel, transparent et crédible.**
Ni “application de plan”, ni “IA magique”, mais une vraie **intelligence d’entraînement contextualisée.**

---

## 💡 Différenciateurs clés

1. **Analyse physiologique explicite**

   * “Tu cours ton 10K à 91 % de ta VMA : solide. Pour 45’, il faut viser 14.5 de VMA.”

2. **Coaching adaptatif**

   * Ajustement du plan selon le réalisme physiologique, pas selon les seules performances.

3. **Multi-objectifs gérés et priorisés**

   * Tu peux préparer plusieurs courses cohérentes (ex : 10K rapide + marathon).

4. **Feedback clair et mesuré**

   * Analyse hebdomadaire rationnelle et visualisation de la progression.

5. **Planification annuelle raisonnée**

   * Limitation des objectifs majeurs, respect de la charge, alternance des cycles.

---

## 🪜 Ce que contient le MVP, ni plus ni moins

| Domaine        | Fonction              | Description                                          |
| -------------- | --------------------- | ---------------------------------------------------- |
| Auth           | Connexion Strava      | Authentification et import d’activités               |
| Profil         | Analyse initiale      | VMA, FC repos / max, zones cardio                    |
| Objectifs      | Création + Diagnostic | Objectif 5K–42K, diagnostic réalisme                 |
| Coaching       | Plan de progression   | Si gap détecté, proposition d’un bloc de progression |
| Multi-objectif | Gestion & priorité    | Plusieurs objectifs, hiérarchie temporelle           |
| Feedback       | Hebdo / global        | Synthèse neutre des progrès et écarts                |

---

## 🧭 Résumé final — L’esprit Runalytics

> Runalytics, c’est **le coach qui te parle comme un humain intelligent** :
> il lit tes données, il t’explique la vérité, il ne te juge pas,
> il te montre le chemin entre ton niveau réel et ton objectif,
> et il t’aide à y arriver sans bullshit ni magie.

---

Souhaites-tu que je te fasse maintenant une **version condensée “vision produit”** — 5 lignes prêtes à coller dans ton README ou ta landing page (“Qu’est-ce que Runalytics ? À qui ça s’adresse ? Pourquoi c’est différent ?”)?

* Bienvenue dans mon projet Node.js

* Les commandes
npm install
Il faut run le projet avec node index.js et il se trouve à l'adresse localhost:8080

* Présentation du projet
Mon application est un modérateur de tweets, ainsi les tweets affichés en rouge contiennent un ou plusieurs mots d’une liste d’insultes.
De plus, il y a un compteur qui permet de savoir le nombre de tweets insultants.
Il est possible pour les utilisateurs de mon application de supprimer les tweets insultants en cliquant sur le bouton signaler.

* Ce que j'ai tenté de faire
J'aurais aimé pouvoir décrémenter mon compteur lorsque l'utilisateur supprime le tweet.
Limiter le nombre de tweets reçus (avec get on peut mettre en paramètre count, mais pas en stream j'ai l'impression)

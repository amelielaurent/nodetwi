* Bienvenue dans mon projet Node.js

* Les commandes :

npm install
Pour run le projet : node index.js et il se trouve à l'adresse localhost:8080

* Présentation du projet :

Mon application est un modérateur de tweets, ainsi les tweets affichés en rouge contiennent un ou plusieurs mots d’une liste d’insultes.
Si il n'y a pas de tweets insultants, essayez plusieurs fois, ou alors ajoutez un mot commun dans la liste et cela marchera.
De plus, il y a un compteur qui permet de savoir le nombre de tweets insultants.
Enfin, il est possible pour les utilisateurs de mon application de supprimer ces tweets en cliquant sur le bouton signaler.

* Ce que j'ai tenté de faire :

J'aurais aimé pouvoir décrémenter mon compteur lorsque l'utilisateur supprime le tweet.
Limiter le nombre de tweets reçus (avec get on peut mettre en paramètre count, mais pas en stream j'ai l'impression).
J'aurais également voulu que le client puisse ajouter une insulte à filtrer via le formulaire. Mais je n'ai pas réussi à
faire passer les données entrées par le client dans le transform.

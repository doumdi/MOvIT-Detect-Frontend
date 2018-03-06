# MOvIT-Detect-Frontend

## Table des matières

* [1. Getting Started](#1-getting-started)
* [2. Anciennes fonctionnalités](#2-anciennes-fonctionnalités)
* [3. ReactJS](#3-reactjs)

# 1. Getting Started

## 1.1 Pré-requis

Les prérequis pour rouler le projet:

* Un Terminal
* Git
* Node.js

### 1.1.1 Mac OS

##### Terminal

Par défaut, l'application Terminal est installée sur Mac OS. Ce pré-requis ne devrait donc pas poser de problème.

##### Git

Vous pouvez installer Git à partir du Terminal. Pour ce faire, ouvrez le terminal et entrez la commande suivante:

```
git --version
```

Si git est déjà installé, votre version sera affichée. Sinon, un message vous alertera afin de l'installer. Vous pourrez donc suivre les instructions pour se faire. Les options par défaut vont fonctionner.

Si vous préférez l'installer autrement, vous pouvez visiter le lien suivant: http://git-scm.com/download/mac

##### Node.js

Afin d'installer Node.js, vous devez d'abord installer Homebrew

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Maintenant que Homebrew a été installé, vous pouvez installer Node.js

```
brew install node
```

Afin de vous assurer que le tout a bien été installé, écrivez les commandes suivantes. Elles devraient vous donner des numéros de version.

```
node -v
npm -v
```

## 1.2 Télécharger le programme

Afin de télécharger le programme, il est possible de cloner le répertoire avec le protocol HTTPS. Ouvrez l'application terminal et exécuter la ligne suivante.

```
git clone https://github.com/AustinDidierTran/MOvIT-Detect-Frontend.git
```

Le terminal vous demandera alors votre identifiant et votre mot de passe Github afin de lui permettre de vous identifier et de vous autoriser à copier le code.

Une fois le code cloné, vous pouvez y accéder avec la commande suivante. Vous devrez exécuté cette commande à chaque ouverture du terminal pour vous diriger dans le code.

```
cd MOvIT-Detect-Frontend
```

## 1.3 Rouler le programme

Pour commencer à développer pour le projet, commencez par vous assurer que vous êtes sur la branch develop.

```
git checkout develop
```

Si cette commande provoque des erreurs, assurez-vous d'être dans le projet. 


Puis, pour partir le projet, simplement rouler la commande suivante

```
npm start
```

La commande installe tous les packages npm manquants et part le serveur sur le port 3000.

## 1.4 Mettre à jour sa version

Afin de mettre à jour sa version, il suffit d'aller chercher les changements.

```
git pull origin develop
```

## 1.5 Créer sa première branche

Basez votre branche sur develop. Par la suite, créer votre branche en suivant une des nomenclatures suivantes.

```
feature/<JIRA>
bug/<JIRA>
```

Évidemment, changer <JIRA> par le nom de la tâche associé. Par exemple:

```
feature/MOVIT-149
bug/MOVIT-149
```

Le fait d'y aller avec cette nomenclature va changer en temps réel le status de la tâche dans JIRA. Également, c'est beaucoup plus clair pour les code reviews.

## 1.6 Faire son premier commit

Avant de faire votre commit, assurez-vous que les règles de linting sont respectés et que les tests passent.

```
npm run lint
npm test
```

Si vous ne le faite pas, les propriétaires des répertoires le verront directement dans GitHub. Pour vous assurez de voir les erreurs de linting en temps réel, des extensions ESLint sont disponibles avec la majorité des IDE pour le développement web.

Une fois que le tout est fait, assurez-vous d'être à jour avec la branche develop

```
git pull origin develop
```

Puis, assurez-vous de mettre tous les fichiers non-désirables dans le .gitignore, puis ajouter les et créer votre commit.

```
git add .
git commit -m "Message quelconque de commit"
```

Évidemment, changer le message pour le message approprié. À ce moment, le linter passe et si jamais il échoue, le commit n'est pas créé. Corrigez les erreurs, puis réessayer.

Une fois le tout fait, pousser vos changements dans github

```
git push origin feature/<JIRA>
```

À partir de ce moment, aller dans Github et créez votre pull request. Une fois votre pull request créé, la tâche dans JIRA tombera dans le status *In Review*.

# 2. Anciennes fonctionnalités

Le premier mandat que nous devons accomplir est de réusiner le code tout en maintenant les fonctionnalités actuelles en places. Voici la liste de ces fonctionnalités.

* Gérer les routes de la page web au niveau du serveur Node.js
* Supporter chaque vues (Configuration, dayGraph, Home, monthGraph, Notifications, Objectives, Parameters, Peripheriques, Real_time_data, Recommandation, Results, Simulateur)
* Écouter sur le port 8080

# 3. ReactJS

Pour la partie front-end du projet, nous avons décidé d'utiliser le framework ReactJS. Vous retrouverez un résumé de qu'est-ce qu'est React et pourquoi nous l'avons utilisé ci-dessous.

### React, c'est quoi?

ReactJS, c'est un framework javascript qui permet des créer une interface usager et de gérer la vue d'une application. ReactJS ne gère ni le modèle, ni le contrôleur comme la plupart des différents frameworks MVC.

Or, ReactJS est moins autonome que les autres Framework. Il dépend donc de librairies externes pour fonctionner. Son créateur, Facebook, a donc programmé toutes les librairies nécessaires à son bon fonctionnement. L'avantage d'un framework moins autonome est d'offrir une plus grande modularité. Ainsi, si certains modules ont des contraintes que l'on ne peut respecter, il est possible de le remplacer nous-même ou de voir les alternatives *open source* qui sont très nombreuses avec la communauté qui est très forte pour ce framework.

Contrairement à la structure classique de Javascript, ReactJS propose une approche par composantes. Ainsi, à la place de générer une page HTML et de la modifier à l'aide de scripts Javascript, la vue est plutôt séparé en plusieurs composants Javascript qui génère du HTML à leur tour. Cela permet une approche plus déclarative au lieu d'impérative (en d'autres mots, le code dit ce qu'il fait au lieu de comment il le fait). Cela permet également une plus grande modularité et une réutilisation des composantes.

### Pourquoi React?

* Facilité à tester. Avec des composants modulaires, il est facile de faire les tests unitaires.
* Réutilisation des composantes. Avec des composants modulaires, il est facile de les réutiliser et avec une communauté forte, on peut même importer des composantes *open source*!
* Facile à comprendre. Avec une approche dite déclarative au lieu d'impérative, même le moins habile des programmeurs peut comprendre rapidement la structure de l'application!
* Facile à apprendre. Assurément subjectif comme avantage, mais la communauté semble s'entendre que React est facile à apprendre. En négligeant la partie modèle et contrôleur, il est moins complexe à comprendre.
* Performance. Ce n'est pas nécessairement important pour le projet, mais React, pour de nombreuses raisons, est un des frameworks les plus performants pour ce type de besoin.
* Une communauté très forte. Si jamais nous faisons face à des problèmes, cette communauté nous aidera forcément à régler nos problèmes rapidement.

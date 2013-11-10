## Présentation

Plugin TwentyTwenty pour Dotclear 2.6 et supérieur

Permet un effet avant/après sur deux images de mêmes dimensions.

## Usage

Insérer les deux images dans une div de la façon suivante :

<pre>
	<div class="twentytwenty-container">
		<img src="/public/avant.jpg" title="Image avant" alt="Image avant traitement" />
		<img src="/public/apres.jpg" title="Image après" alt="Image après traitement" />
	</div>
</pre>

Pour aligner l'ensemble vous pouvez rajouter une des classes suivantes à la <code>div.twentytwenty-container</code> :

* twentytwenty-left : cadrage à gauche
* twentytwenty-center : centré
* twentytwenty-right : aligné à droite

Au format wiki (Dotclear), insérer les images de la façon suivante :

<pre>
	///html
	<div class="twentytwenty-container twentytwenty-center">
	///
	((/public/avant.jpg|Image avant||Image avant traitement))
	((/public/apres.jpg|Image après||Image après traitement))
	///html
	</div>
	///
</pre>

## Crédits

D'après le plugin jQuery TwentyTwenty disponible ici sous licence MIT (voir ci dessous) : http://zurb.com/playground/twentytwenty

## MIT Open Source License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

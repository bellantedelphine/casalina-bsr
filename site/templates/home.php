<?php
/*
  Templates render the content of your pages.

  They contain the markup together with some control structures
  like loops or if-statements. The `$page` variable always
  refers to the currently active page.

  To fetch the content from each field we call the field name as a
  method on the `$page` object, e.g. `$page->title()`.

  This home template renders content from others pages, the children of
  the `photography` page to display a nice gallery grid.

  Snippets like the header and footer contain markup used in
  multiple templates. They also help to keep templates clean.

  More about templates: https://getkirby.com/docs/guide/templates/basics
*/

?>
<div class="logo" id="logo_home">
<img src="media/pages/home/logo_casalina.jpg"></img>
<img src="media/pages/home/logo_bsr.png"></img>
</div>
<?php snippet('header') ?>
 <?php snippet('intro') ?>
<div>Casalina c’est le projet d’agriculture sociale lancé par le Collectif BSR dans les Pouilles, au sud de l’Italie. 

Le projet a débuté en Juillet 2018 avec la rénovation d’une ferme dans le but de créer un lieu de rencontre entre les populations locales, les travailleurs saisonniers venus majoritairement d’Afrique et les bénévoles bruxellois ou internationaux.

Par la suite, c’est sous forme de missions périodiques et grâce au soutien d’habitants du village que le projet poursuit ses objectifs:
<ul>
<li>de solidarité auprès des populations migrantes</li>
<li> de recherche pour une agriculture durable et respectueuse</li>
<li>d’échanges culturels et de savoirs-faire</li>
</ul>
</div>
<div>
</br>Le collectif Building Social Resilience est composé d’un noyau d’une vingtaine de bénévoles venant de Bruxelles et d’ailleurs. 
Il est soutenu au quotidien par un nombre infini de belles personnes réunies par des valeurs communes telles que la solidarité et l’écologie, et préoccupées par les crises migratoires et environnementales que nous traversons.
Le BSR cherche à sensibiliser sur ces problématiques contemporaines et à mettre en place des projets pour défendre le droit et l’accueil des réfugiés, l’agriculture naturelle et la souveraineté alimentaire tout en valorisant les échanges culturels et les espaces ruraux.
</div>
 
  <?php
  /*
    We always use an if-statement to check if a page exists to
    prevent errors in case the page was deleted or renamed before
    we call a method like `children()` in this case
  
=> page('casalina') récupère les (enfants) articles dans le pannel correspondant  */
  ?>
  
    <h1> CASALINA </h1>
    
  <?php if ($casalinaPage = page('casalina')): ?> 
  <ul class="home-grid">
    <?php foreach ($casalinaPage->children()->listed() as $casalina): ?>
    <li>
      <a href="<?= $casalina->url() ?>">
        <figure>

          <?php if ($cover = $casalina->cover()): ?>
          <?= $cover->resize(1024, 1024) ?>
          <?php endif ?>
          <figcaption>
            <span>
              <span class="example-name"><?= $casalina->title()->html() ?></span>
            </span>
          </figcaption>
        </figure>
      </a>
    </li>
    <?php endforeach ?>
  </ul>
  <?php endif ?>
  
   <h1> BSR </h1>
  
    <?php if ($bsrPage = page('bsr')): ?>
  <ul class="home-grid">
    <?php foreach ($bsrPage->children()->listed() as $bsr): ?>
    <li>
      <a href="<?= $bsr->url() ?>">
        <figure>
          <?php
          /*
            The `cover()` method defined in the `album.php`
            page model can be used everywhere across the site
            for this type of page

            We can automatically resize images to a useful
            size with Kirby's built-in image manipulation API
          */
          ?>
          <?php if ($cover = $bsr->cover()): ?>
          <?= $cover->resize(1024, 1024) ?>
          <?php endif ?>
          <figcaption>
            <span>
              <span class="example-name"><?= $bsr->title()->html() ?></span>
            </span>
          </figcaption>
        </figure>
      </a>
    </li>
    <?php endforeach ?>
  </ul>
  <?php endif ?>
  
  
<!--<?php snippet('footer') ?>

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
<?php snippet('header') ?>
  <?php snippet('intro') ?>
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
          <?= $cover->resize(20, 20) ?>
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
          <?= $cover->resize(200, 200) ?>
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
  
  
<?php snippet('footer') ?>

'use strict';

//FUNCTIONS -> CREATE
function createLinkTitle() {
  let i = 1;
  for (const elementPostTitleSelector of postTitleSelector) {
    const dataLinkTitle = templateLink({postTitle: elementPostTitleSelector.innerHTML, spanI: i});
    i++;
    document.querySelector('.links-articles').innerHTML += dataLinkTitle;
  }
  listSelector.querySelector('li a span').classList.add('active');
}

function createTagsBottom() {
  for (const elementPostSelector of postSelector) {
    let dataTags = elementPostSelector.getAttribute('data-tags').split(' ');
    for (const elementDataTags of dataTags) {
      const dataTagsBottom = templateTagsBottom({dataTagsBottom: elementDataTags});
      elementPostSelector.querySelector('.list-horizontal').innerHTML += dataTagsBottom;
    }
  }
}

function createRightListTags() {
  let arrAllDataTags = [], objectTags = {}, maxQtyTag = 0;
  for (const elementPostSelector of postSelector) {
    arrAllDataTags.splice(arrAllDataTags.length, 0, ...elementPostSelector.getAttribute('data-tags').split(' '));
  }

  for (let i = 0; i < arrAllDataTags.length; ++i) {
    if (!objectTags[arrAllDataTags[i]]) {
      objectTags[arrAllDataTags[i]] = 0;
    }
    ++objectTags[arrAllDataTags[i]];
    if (maxQtyTag < objectTags[arrAllDataTags[i]]) {
      maxQtyTag = objectTags[arrAllDataTags[i]];
    }
  }

  let whatTagSize = '';
  for (const elementObjectTag in objectTags) {
    let calculatePercentage = Math.floor((objectTags[elementObjectTag] * 100) / maxQtyTag);
    if (calculatePercentage < 25) {
      whatTagSize = 'size-tag-1';
    } else if (calculatePercentage > 25 && calculatePercentage <= 50) {
      whatTagSize = 'size-tag-2';
    } else if (calculatePercentage > 50 && calculatePercentage <= 75) {
      whatTagSize = 'size-tag-3';
    } else if (calculatePercentage > 75) {
      whatTagSize = 'size-tag-4';
    }
    const dataRightListTags = templateRightListTags({
      dataObjectTags: elementObjectTag,
      dataWhatTagSize: whatTagSize,
      dataObjectTagsValue: objectTags[elementObjectTag]
    });
    document.querySelector('.list-tags').innerHTML += dataRightListTags;
  }
}

function createRightListAuthor() {
  let arrAllAuthors = [], objectAuthors = {};
  for (const elementPostSelector of postSelector) {
    arrAllAuthors.splice(arrAllAuthors.length, 0, elementPostSelector.getAttribute('data-author'));
  }

  for (let i = 0; i < arrAllAuthors.length; ++i) {
    if (!objectAuthors[arrAllAuthors[i]]) {
      objectAuthors[arrAllAuthors[i]] = 0;
    }
    ++objectAuthors[arrAllAuthors[i]];
  }

  // let html = '';
  for (const elementObjectAuthor in objectAuthors) {
    const dataRightListAuthor=templateRightListAuthor({dataObjectAuthor:elementObjectAuthor,dataObjectAuthorValue:objectAuthors[elementObjectAuthor]});
    document.querySelector('.list-authors').innerHTML += dataRightListAuthor;
  }
}

function createTopLinkAuthors() {
  for (const elementPostSelector of postSelector) {
    const dataAuthorTop = templateAuthorTop({dataAuthorTop: elementPostSelector.getAttribute('data-author')});
    elementPostSelector.querySelector('.post-author').innerHTML += dataAuthorTop;
  }
}

//FUNCTIONS -> REMOVE
function removeActiveLinkTitle() {
  for (const elementlistSelectorSpan of listSelectorSpan) {
    elementlistSelectorSpan.classList.remove('active');
  }
}

function removeActivePost() {
  for (const elementPostSelector of postSelector) {
    elementPostSelector.classList.remove('active');
  }
}

function removeHideLinksTitle() {
  for (const elementlistSelectorSpan of listSelectorSpan) {
    elementlistSelectorSpan.classList.remove('hide');
  }
}

//FUNCTION -> ADD
function addActiveFirstTitleAndPost() {
  let rememberArticleID = '';
  for (const elementlistSelectorSpan of listSelectorSpan) {
    if (elementlistSelectorSpan.classList.contains('hide') == false) {
      removeActiveLinkTitle();
      elementlistSelectorSpan.classList.add('active');
      rememberArticleID = elementlistSelectorSpan.getAttribute('id');
      break;
    }
  }
  for (const elementPostSelector of postSelector) {
    if (elementPostSelector.getAttribute('id') == rememberArticleID.substring(5, rememberArticleID.length)) {
      removeActivePost();
      elementPostSelector.classList.add('active');
      break;
    }
  }
}

//FUNCTIONS -> CLICK
function checkWhatWasClicked(e) {
  //click title
  if (e.target.closest('a').classList.contains('a-href')) {
    removeActiveLinkTitle();
    e.target.classList.add('active');
    removeActivePost();
    for (const elementPostSelector of postSelector) {
      if (elementPostSelector.getAttribute('id') == e.target.getAttribute('id').substring(5, e.target.getAttribute('id').length)) {
        elementPostSelector.classList.add('active');
        break;
      }
    }
  }
  //click tags bottom and tags right
  if (e.target.closest('a').classList.contains('b-href') || e.target.closest('a').classList.contains('c-href')) {
    removeHideLinksTitle();
    let firstWord = e.target.innerHTML.split(' ');
    for (const elementPostSelector of postSelector) {
      if (elementPostSelector.getAttribute('data-tags').search(firstWord[0]) == -1) {
        for (const elementlistSelectorSpan2 of listSelectorSpan2) {
          if (elementlistSelectorSpan2.getAttribute('id') == 'span-' + elementPostSelector.getAttribute('id')) {
            elementlistSelectorSpan2.classList.toggle('hide', true);
            break;
          }
        }
      }
    }
    addActiveFirstTitleAndPost();
  }
  //click author top and authors right
  if (e.target.closest('a').classList.contains('e-href') || e.target.closest('a').classList.contains('d-href')) {
    removeHideLinksTitle();
    let firstWord = e.target.innerHTML.split('.');
    for (const elementPostSelector of postSelector) {
      if (elementPostSelector.getAttribute('data-author').search(firstWord[0].trim()) == -1) {
        for (const elementlistSelectorSpan2 of listSelectorSpan2) {
          if (elementlistSelectorSpan2.getAttribute('id') == 'span-' + elementPostSelector.getAttribute('id')) {
            elementlistSelectorSpan2.classList.toggle('hide', true);
            break;
          }
        }
      }
    }
    addActiveFirstTitleAndPost();
  }
}

//START
const templateLink = Handlebars.compile(document.querySelector('#create-link-title').innerHTML),
  templateTagsBottom = Handlebars.compile(document.querySelector('#create-tags-bottom').innerHTML),
  templateAuthorTop = Handlebars.compile(document.querySelector('#create-top-link-authors').innerHTML),
  templateRightListTags = Handlebars.compile(document.querySelector('#create-right-list-tags').innerHTML),
  templateRightListAuthor = Handlebars.compile(document.querySelector('#create-right-list-author').innerHTML);

const listSelector = document.querySelector('.list'),
  postSelector = document.querySelectorAll('.post'),
  postTitleSelector = document.querySelectorAll('.post-title');//posty dla artykulow

createLinkTitle();
createTagsBottom();

const listSelectorSpan = document.querySelectorAll('.articles'),
  listSelectorSpan2 = document.querySelectorAll('.articles');//tymczasowe ROZWIĄZANIE PROBLEMU- szukam bledu

createRightListTags();
createTopLinkAuthors();
createRightListAuthor();

let clickBlog = document.querySelector('.blog');
clickBlog.addEventListener('click', checkWhatWasClicked);

const sectionTitle = document.querySelector('.section-title');
sectionTitle.addEventListener('click', removeHideLinksTitle);
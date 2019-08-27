var keystone = require('keystone');
var Types = keystone.Field.Types;

var KUnit = new keystone.List('KUnit', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true, fixed: true },
  defaultSort: '-createdAt'
});

KUnit.add({
  // this short name is unique
  // this will identify the unit later on
  unitName: {
    type: String,
    required: true,
    initial: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    initial: true,
  },
  unit: {
    type: Number,
    initial: true,
    default: 0,
  },
  type: {
    type: Types.Select,
    /*
      hack_a: hack nao 2018
      hack_b: hack nao 2019
      ielts_a: hack ielts
      ielts_b: deprecated
      gwt: general writing task 1
      awt: general writing task 1
      wtt: writing task 2
    */
    options: 'hack_a, hack_b, ielts_a, ielts_b, gwt, awt, wtt',
    default: 'hack_a',
    required: true,
    initial: true,
  },
  content: {
    question: {
      type: Types.Html,
      wysiwyg: true,
      height: 200,
    },
    attach: {
      type: Types.Url,
    },
    tip: {
      type: Types.Html,
      wysiwyg: true,
      height: 200,
    },
    modelAnswer: {
      type: Types.Html,
      wysiwyg: true,
      height: 400,
    },
    notes: {
      type: Types.Html,
      wysiwyg: true,
      height: 200,
    },
  },
  state: {
    type: Types.Select,
    options: 'published, draft, archived',
    default: 'published',
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
  },
});

KUnit.defaultColumns = 'title, unitName|15%, code|15%, type|15%, createdAt|20%';
KUnit.register();

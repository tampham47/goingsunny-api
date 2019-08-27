/**
 *
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CrawlWriting Model
 * ==========
 */

var CrawlWriting = new keystone.List('CrawlWriting', {
  defaultSort: 'createdAt'
});


CrawlWriting.add({
  state: {
    type: Types.Select,
    options: 'published, draft',
    default: 'draft',
    index: true,
  },
  source: {
    type: Types.Url,
    initial: true,
  },
  article: {
    type: Types.Html,
    wysiwyg: true,
    height: 400,
    initial: true,
  },
  unit: {
    type: Types.Text,
    initial: true,
  },
  title: {
    type: Types.Text,
    required: true,
    initial: true,
  },
  question: {
    type: Types.Html,
    wysiwyg: true,
    height: 200,
    initial: true,
  },
  attach: {
    type: Types.Url,
    initial: true,
  },
  tip: {
    type: Types.Html,
    wysiwyg: true,
    height: 200,
    initial: true,
  },
  modelAnswer: {
    type: Types.Html,
    wysiwyg: true,
    height: 400,
    initial: true,
  },
  notes: {
    type: Types.Html,
    wysiwyg: true,
    height: 200,
    initial: true,
  },
  createdAt: {
    type: Types.Datetime,
    default: Date.now,
    noedit: true,
}
});

CrawlWriting.schema.pre('save', function(next) {
  var KUnit = keystone.mongoose.model('KUnit');

  if (this.state === 'published') {
    var unit = new KUnit({
      title: this.title,
      unit: this.unit,
      type: 'gwt',
      unitName: `gwt${this.unit}`,
      content: {
        question: this.question,
        attach: this.attach,
        tip: this.tip,
        modelAnswer: this.modelAnswer,
        notes: this.notes,
      },
      state: 'published',
    });

    unit.save(function(err) {
      if (err) {
        throw new Error(err);
      }
    });
  }
  next();
});

CrawlWriting.defaultColumns = 'title, state|15%, createdAt|20%';
CrawlWriting.register();

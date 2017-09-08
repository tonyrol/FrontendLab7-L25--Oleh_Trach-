var model = {
    currentPerson: {},
    allPersons: [
        {
        name: 'Lily Butler',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
      },
      {
        name: 'Waller Perry',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
      },
      {
        name: 'Tammi Donovan',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
      },
      {
        name: 'Doreen Flowers',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
      },
      {
        name: 'Price Pace',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
      },
      {
        name: 'Larson Maldonado',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
      },
      {
        name: 'Berg Bolton',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
      },
      {
        name: 'Mack Lott',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
      },
      {
        name: 'Rosanna Mcleod',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
      },
      {
        name: 'Rosalie Rice',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
      },
      {
        name: 'Virginia Buchanan',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
      },
      {
        name: 'Lorna Stein',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
      },
      {
        name: 'Rosalie Steele',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
      },
      {
        name: 'Wilcox Boyd',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
      },
      {
        name: 'Ollie Rice',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
      }
    ]
};

var control = {
    init: function(){
        listView.init();
        listView.render();

        profileView.init();
        briefView.init();
    },

    getAllPersons: function() {
        return model.allPersons;
    },

    setCurrentPerson: function(index){
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
    },
    getCurrentPerson: function(){
        return model.currentPerson;
    },
    viewCurrentProfile: function(){
        profileView.render();
        briefView.render();
    },
    setCurrentPersonScore: function(value){
        model.currentPerson.score = value;
        profileView.render();
        briefView.render();
    },
    movePersonUp: function (personIndex) {
        if (personIndex == 0) {
            return;
        }

        var tmp = model.allPersons[personIndex];
        model.allPersons[personIndex] = model.allPersons[personIndex - 1];
        model.allPersons[personIndex - 1] = tmp;

        listView.render();
    },
    movePersonDown: function (personIndex) {
        if (personIndex == model.allPersons.length - 1) {
            return;
        }

        var tmp = model.allPersons[personIndex];
        model.allPersons[personIndex] = model.allPersons[personIndex + 1];
        model.allPersons[personIndex + 1] = tmp;

        listView.render();
    }
};

var listView = {
    init: function() {
        this.$container = $('.list');
    },
    render: function() {
        var self = this;
        self.$container.html('');
        control.getAllPersons().forEach(function(person, personIndex) {
            var $li = $('<li></li>');

            var $arrowsDiv = $('<div></div>').addClass("arrows");
            arrowsView.init($arrowsDiv);
            arrowsView.render(personIndex);
            $li.append($arrowsDiv);

            namesView.init($li);
            namesView.render(person, personIndex);

            var $scoreDiv = $('<div></div>').addClass("score");
            scores2View.init($scoreDiv);
            scores2View.render(person, personIndex);
            $li.append($scoreDiv);

            self.$container.append($li);
        });
    }
};

var arrowsView = {
    init: function($container) {
        this.$container = $container;
    },
    render: function(index) {
        var $div = $('<div class="arrow up"></div><div class="arrow down"></div>');
        this.$container.html($div);

        this.handleClicks($div, index);
    },
    handleClicks: function($div, index) {
        this.$container.on('click', '.arrow.up', function () {
            control.movePersonUp(index);
        });

        this.$container.on('click', '.arrow.down', function () {
            control.movePersonDown(index);
        });
    }
};

var namesView = {
    init: function($container) {
        this.$container = $container;
    },
    render: function(person, index) {
        var $div = $('<div class="name"></div>');
        $div.html(person.name);
        this.handleClicks($div, index);
        this.$container.append($div);
    },
    handleClicks: function($div, currentIndex){
        $div.on('click', function(e){
            control.setCurrentPerson(currentIndex);
        });
    }
};

var scores2View = {
    init: function($container) {
        this.$container = $container;
        this.mode = 'view';
    },
    render: function(person, currentPersonIndex) {
        if (this.mode === 'view') {
            this.$container.html(person.score);
        } else {
            var $input = $('<input>');
            $input.val(person.score);
            this.$container.html($input);
            $input.focus();
        }

        this.handleClicks(this.$container, person, currentPersonIndex);
    },
    handleClicks: function($container, person, currentPersonIndex) {
        var self = this;
        $container.on('click', function(e) {
            if (self.mode === 'view') {
                control.setCurrentPerson(currentPersonIndex);
                self.init($container);
                self.mode = 'edit';
                self.render(person);
            }
        });

        $container.on('focusout', 'input', function(e) {
            var newScore = $(e.target).val();
            control.setCurrentPersonScore(newScore);
            self.init($container);
            self.mode = 'view';
            self.render(person, currentPersonIndex);
        });
    }
};

var profileView = {
    init: function(){
        this.$container = $('.profile');
    },
    render: function(){
        var currentPerson = control.getCurrentPerson();
        var tempalte = '<img src="'+currentPerson.photoUrl+'">'
                        + '<h3>'+ currentPerson.name +'</h3>'
                        + '<p>Score: '+currentPerson.score+'</p>';
        this.$container.html(tempalte);
    }
};

var briefView ={
    init: function(){
        this.$container = $('.brief');
    },
    render: function () {
        var currentPerson = control.getCurrentPerson();
        var template = '<p> Selected person is '
            + '<b>'+ currentPerson.name +'</b>' + '. '
            + 'Person\'s score is '
            + currentPerson.score+'</p>';
        this.$container.html(template);
    }
}

control.init();
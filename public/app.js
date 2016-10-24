var app = angular.module('redditApp', ['ngAnimate']);

app.controller('AppController', function($scope) {

    $scope.newComment = {};
    $scope.newPost = {};
    $scope.view = {};
    $scope.view.searchPosts = "";
    $scope.view.newPostVisible = false;
    $scope.view.sortOptions = ['votes', 'date', 'title'];
    $scope.view.sortOption = $scope.view.sortOptions[0];
    $scope.view.orderVal = '-votes';
    $scope.view.posts = [{
        title: "Dogs are cool!",
        author: "Ono Ec",
        image: "http://67.media.tumblr.com/96b44e40fa26e4223f330c6715960ee0/tumblr_moru6ilp381rnleioo1_500.jpg",
        description: "Who can deny that this dog ain't cool? Dog is about to watch a 3D movie or something. Anyways, cool picture of this cool dog.",
        date: moment().subtract(2, 'days').subtract(3, 'hours').calendar(),
        votes: 6,
        comments: [{
            author: "Luis",
            text: "Cool glasses dawg!."
        }],
        commentsVisible: false,
        newCommentVisible: false
    }, {
        title: "Cats are cooler than dogs...",
        author: "Erica Lopez",
        image: "http://orig08.deviantart.net/d157/f/2015/225/c/9/cool_cat__nature_by_tovalhalla-d95iyze.jpg",
        description: "Although I can't deny that dogs are cool, everybody knows that cats are cooler than dogs!",
        date: moment().subtract(2, 'hours').calendar(),
        votes: 3,
        comments: [{
            author: "Alex N",
            text: "You are right!"
        }, {
            author: "Kevin Smith",
            text: "They are both cool I guess"
        }],
        commentsVisible: false,
        newCommentVisible: false
    }, {
        title: "Himalayas",
        author: "Scott Hawk",
        image: "http://www.ox.ac.uk/sites/files/oxford/styles/ow_medium_feature/public/field/field_image_main/himalayas_0.jpg?itok=KlFepQPI",
        description: "A breath-taking view of one of the most amazing mountains in the world. I took this picture with some friends.",
        date: moment("20151010", "YYYYMMDD").calendar(),
        votes: -1,
        comments: [],
        commentsVisible: false,
        newCommentVisible: false
    }];

    $scope.changeVotes = function(post, changeVal) {
        post.votes += changeVal;
    };

    $scope.upvoteClass = function(post) {
        if (post.votes > 0) {
            return "positive";
        } else if (post.votes < 0) {
            return "negative";
        } else {
            return "";
        }
    };

    $scope.toggleCommentVisibility = function(post) {
        post.commentsVisible = !post.commentsVisible;
    };

    $scope.toggleNewCommentVisibility = function(post) {
        $scope.view.posts.forEach(function(otherPost) {
            if (otherPost !== post) {
                otherPost.newCommentVisible = false;
            } else {
                otherPost.newCommentVisible = !otherPost.newCommentVisible;
            }
        });
        $scope.newComment = {};
    };

    $scope.toggleNewPostVisibility = function() {
        $scope.view.newPostVisible = !$scope.view.newPostVisible;
    };

    $scope.addComment = function(post, comment) {
        if (comment.author && comment.text) {
            post.comments.push(comment);
            post.newCommentVisible = false;
            $scope.newComment = {};
        }
    };

    $scope.addPost = function(post) {
        post.date = moment().calendar();
        post.votes = 0;
        post.comments = [];
        post.commentsVisible = false;
        post.newCommentVisible = false;
        $scope.view.posts.push(post);
        $scope.view.newPostVisible = false;
        $scope.newPost = {};
        $scope.postForm.$setUntouched();
    };

    $scope.checkForError = function(option) {
        return option.$invalid && option.$touched;
    };

    $scope.setOrderVal = function(newVal) {
        $scope.view.sortOption = newVal;
        $scope.view.orderVal = newVal === "title" ? newVal : '-' + newVal;
    };

});

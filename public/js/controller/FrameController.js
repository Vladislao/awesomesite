'use strict';

awesome.controller('FrameController',
    function FrameController($scope, $routeParams, $sce, $interval, commentService) {

        var self = this;

        self.add = add;
        self.click = click;
        self.groupClick = groupClick;

        $scope.groups = {};
        $scope.frame = null;

        var link = null;
        var timer = null;
        var open = {};
        var commentMap = {};

        function init(){
            link = $routeParams.link;
            commentService.getLink(link).then(function(data){
                $scope.frame = $sce.trustAsResourceUrl(data.data);
            });
            commentService.get(link).then(handleComments);

            timer = $interval(function(){
                commentService.get(link).then(handleComments);
            }, 1000);
        }
        init();

        $scope.$on("$destroy", function() {
            if (timer) {
                $interval.cancel(timer);
            }
        });

        // add comment
        function add(e, group, text){
            e.stopPropagation();
            commentService.add(link, group.coord, text).then(function(data){
                var id = data.data;
                commentMap[id] = null;
                group.comments.push({
                    Id: id,
                    Text: text,
                    Date: new Date()
                });
            });
        }

        // click on group
        function groupClick(e, group){
            e.stopPropagation();
            swapOpen(group);
        }

        // click on frame
        function click(e){
            var coord = getCrossBrowserElementCoords(e);

            coord.x -= 18;
            coord.y -= 18;

            var key = getKey(coord);
            if($scope.groups.hasOwnProperty(key) == false)
                $scope.groups[key] = {
                    coord: coord,
                    comments: []
                };

            swapOpen($scope.groups[key]);
            //$scope.groups[key].comments.push({Text:'some comment', Date: new Date()});
        }

        function handleComments(data){
            data.data.forEach(function(comment){
                if(commentMap.hasOwnProperty(comment.Id))
                    return;

                commentMap[comment.Id] = null;
                var key = getKey(comment.Coord);
                if($scope.groups.hasOwnProperty(key) == false){
                    $scope.groups[key] = {
                        show: false,
                        coord: comment.Coord,
                        comments: []
                    }
                }
                $scope.groups[key].comments.push({
                    Text: comment.Text,
                    Date: new Date(comment.Date)
                });
            });
        }

        // create group key
        function getKey(coord){
            return coord.x + ',' + coord.y;
        }

        // swap open group to another
        function swapOpen(group){
            // skip self
            if(open === group)
                return;
            // swap
            open.show = false;
            if(open.comments != null && open.comments.length === 0)
                delete $scope.groups[getKey(open.coord)];

            open = group;
            open.show = true;
        }

        // Accepts a MouseEvent as input and returns the x and y
        // coordinates relative to the target element.
        function getCrossBrowserElementCoords(mouseEvent)
        {
            var result = {
                x: 0,
                y: 0
            };

            if (!mouseEvent)
            {
                mouseEvent = window.event;
            }

            if (mouseEvent.pageX || mouseEvent.pageY)
            {
                result.x = mouseEvent.pageX;
                result.y = mouseEvent.pageY;
            }
            else if (mouseEvent.clientX || mouseEvent.clientY)
            {
                result.x = mouseEvent.clientX + document.body.scrollLeft +
                    document.documentElement.scrollLeft;
                result.y = mouseEvent.clientY + document.body.scrollTop +
                    document.documentElement.scrollTop;
            }

            if (mouseEvent.target)
            {
                var offEl = mouseEvent.target;
                var offX = 0;
                var offY = 0;

                if (typeof(offEl.offsetParent) != "undefined")
                {
                    while (offEl)
                    {
                        offX += offEl.offsetLeft;
                        offY += offEl.offsetTop;

                        offEl = offEl.offsetParent;
                    }
                }
                else
                {
                    offX = offEl.x;
                    offY = offEl.y;
                }

                result.x -= offX;
                result.y -= offY;
            }

            return result;
        }

    });
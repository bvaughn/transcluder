// Refer to the README for usage instructions.
angular.module('transcluder', []).directive('transcluder', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attributes, controller, transclude) {
      var compiledFragments = {};

      // transclude() compiles our inner HTML within the correct scope.
      // We don't need to re-$compile it at this point.
      // If we did we would end up duplicating directives within our content.
      // All we need to do is move it to the correct places within the DOM.
      var compiledElements = transclude();

      // Gather up and group document fragments
      _.each(compiledElements, function(compiledElement) {
        var $compiledElement = $(compiledElement);
        var transcludeId = $compiledElement.attr('transclude');

        if (transcludeId) {
          $compiledElement.removeAttr('transclude');

          if (compiledFragments[transcludeId]) {
            compiledFragments[transcludeId].push(compiledElement);
          } else {
            compiledFragments[transcludeId] = [compiledElement];
          }
        }
      });

      // Move all of the transcoded components into their correct places.
      _.each(compiledFragments, function(fragments, transcludeId) {
        var targetId = 'transclude-' + transcludeId;
        var container = $element.find(targetId);

        // Check for elements first but fall back to attributes otherwise.
        if (container.size() === 0) {
          container = $element.find('[' + targetId + ']');
        }

        // Migrate any classes specified by the directives to the trasncluded elements.
        $(fragments).addClass(container.attr('class'));

        container.replaceWith(fragments);
      });
    }
  };
});

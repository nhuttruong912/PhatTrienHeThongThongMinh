appMain.directive('optionsDisabled', ['$parse', function ($parse) {
    var disableOptions = function (scope, attr, element, data, fnDisableIfTrue) {
        // refresh the disabled options in the select element.
        $("option[value!='?']", element).each(function (i, e) {
            var locals = {};
            locals[attr] = data[i];
            $(this).attr("disabled", fnDisableIfTrue(scope, locals));
        });
    };
    return {
        priority: 0,
        require: 'ngModel',
        link: function (scope, iElement, iAttrs, ctrl) {
            // parse expression and build array of disabled options
            var expElements = iAttrs.optionsDisabled.match(/^\s*(.+)\s+for\s+(.+)\s+in\s+(.+)?\s*/);
            var attrToWatch = expElements[3];
            var fnDisableIfTrue = $parse(expElements[1]);
            scope.$watch(attrToWatch, function (newValue, oldValue) {
                if (newValue)
                    disableOptions(scope, expElements[2], iElement, newValue, fnDisableIfTrue);
            }, true);
            // handle model updates properly
            scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
                var disOptions = $parse(attrToWatch)(scope);
                if (newValue)
                    disableOptions(scope, expElements[2], iElement, disOptions, fnDisableIfTrue);
            });
        }
    };
}])
    .directive('attributeTags', ['$compile', function ($compile) {

        var template = ['<div id="{{attrs.id}}" class="{{attrs.class}}" data-ng-click="setFocus()">',
                            '<input id="{{attrs.inputid}}" type="text" placeholder="{{attrs.placeholder}}" class="{{attrs.class}}" autocomplete="off" maxlength="{{attrs.maxlength}}" />',
                    '</div>'];
        return {
            restrict: 'E',
            scope: {
                tags: '=tags',
                parentTag: '=parentTag',
                suggest: '=suggest',
                onTag: '=onTag'
            },
            controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
                $scope.setFocus = function () {
                    angular.element($element).find('input[type="text"]')[0].focus();
                };
            }],
            link: function (scope, element, attrs, controller) {
                var key = { backspace: 8, tab: 9, enter: 13, esc: 27, comma: 188 };
                var attr = '';
                scope.attrs = {
                    'id': '',
                    'inputid': '',
                    'placeholder': '',
                    'class': 'tags',
                    'maxlength': 20
                };

                for (var a in attrs) {
                    attr = a.replace('attr', '').toLowerCase();
                    if (a.indexOf('attr') === 0) {
                        scope.attrs[attr] = attrs[a];
                    }
                }



                element[0].addEventListener("keydown", function (e) {
                    var keycode = e.keyCode || e.which;
                    var $element = $($(this).find('input[type="text"]')[0]);
                    var value = $.trim($element.val());

                    if (keycode == key.enter || keycode == key.comma || keycode == key.tab) {
                        if (value != '') {
                            if (scope.tags.length > 0) {
                                var findTags = scope.tags.filter(function (tag) {
                                    return tag.value.toLowerCase() === value.toLowerCase();
                                });
                                if (findTags.length == 0) {
                                    addTag(value, $element);
                                }
                                else {
                                    var index = scope.tags.indexOf(findTags[0]);
                                    if (index > -1) {
                                        var badge = $element.siblings('.tag:eq(' + index + ')')
                                        badge.addClass('tag-warning')
                                        setTimeout(function () {
                                            $(badge).removeClass('tag-warning')
                                        }, 500)
                                    }
                                }
                            }
                            else {
                                addTag(value, $element);
                            }
                        }
                        $element.val('');
                        e.preventDefault();
                        $scopeApply();
                    }
                    else if (keycode == key.backspace && value == '') {
                        var count = $element.siblings('.tag').length;
                        if (count > 0) {
                            var tag = $element.siblings('.tag:eq(' + (count - 1) + ')');
                            if (tag.hasClass('tag-important')) {
                                var findTags = scope.tags.filter(function (item) {
                                    return item.value.toLowerCase() === tag.data('tag').value.toLowerCase();
                                });
                                if (findTags.length > 0) {
                                    var index = scope.tags.indexOf(findTags[0]);
                                    scope.tags.splice(index, 1);
                                    tag.remove();
                                    if (scope.onTag) {
                                        scope.onTag();
                                        $scopeApply();
                                    }
                                }
                            }
                            else {
                                if (tag.find('.close').length) {
                                    tag.addClass('tag-important');
                                }
                            }
                        }
                    }
                    else if (keycode == key.esc) {
                        $element.val('');
                        $element.siblings('.tag').removeClass('tag-important');
                    }
                    else {
                        $element.siblings('.tag').removeClass('tag-important');
                    }
                });

                var arrTemplate = [];
                for (var i = 0; i < template.length; i++) {
                    arrTemplate.push(template[i]);
                }
                //Compile Template
                element.append($compile(arrTemplate.join(''))(scope));

                //Bind Data
                //edit : add object "true" 
                //editor: Tuấn
                //edit date: 1/6/2015
                if (scope.tags.length > 0) {
                    for (var i = 0; i < scope.tags.length; i++) {

                        createBadge(scope.tags[i].valueId, scope.tags[i].value, scope.tags[i].attributeId, $($(element[0]).find('input[type="text"]')[0]), true);
                    }
                }

                function $scopeApply() {
                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                        scope.$apply();
                    }
                };
                //add flag to show/hide button CLOSE
                //author: Tuấn
                //date: 1/6/2015
                function createBadge(id, value, attributeId, element, flag) {
                    if (flag == true) {

                        $('<span/>', { 'class': 'tag' })
                        .data('tag', { valueId: id, value: value, attributeId: attributeId })
                        .text(value)
                        .insertBefore(element);
                    }
                    else {
                        $('<span/>', { 'class': 'tag' })
                        .data('tag', { valueId: id, value: value, attributeId: 0 })
                        .text(value)
                            //close of tag button
                        .append($('<button type="button" class="close">&times;</button>').on('click', function () {
                            var name = $(this).parent().data('tag').value.toLowerCase();
                            var findTags = scope.tags.filter(function (item) {
                                return item.value.toLowerCase() === name;
                            });
                            if (findTags.length > 0) {
                                var index = scope.tags.indexOf(findTags[0]);
                                scope.tags.splice(index, 1);
                                $(this).parent().remove();
                                if (scope.onTag) {
                                    scope.onTag();
                                }
                            }
                        }))
                        .insertBefore(element);
                    }


                };
                function addTag(value, element) {
                    var id = 0;
                    if (scope.suggest.length > 0) {
                        var findValueIds = scope.suggest.filter(function (suggest) {
                            return suggest.name.toLowerCase() === value.toLowerCase();
                        });
                        if (findValueIds.length > 0) {
                            id = findValueIds[0].id;
                        }
                    }
                    scope.tags.push({ valueId: id, value: value, attributeId: scope.parentTag.id });
                    createBadge(id, value, 0, element);// scope.parentTag.id
                    if (scope.onTag) {
                        scope.onTag();
                    }
                };
            }
        };
    }])
    .directive('tags', ['$compile', function ($compile) {

        var template = ['<div id="{{attrs.id}}" class="{{attrs.class}}" data-ng-click="setFocus()">',
                            '<input id="{{attrs.inputid}}" type="text" placeholder="{{attrs.placeholder}}" class="{{attrs.class}}" autocomplete="off" maxlength="{{attrs.maxlength}}" />',
                    '</div>'];
        return {
            restrict: 'E',
            scope: {
                tags: '=tags',
                suggest: '=suggest'
            },
            controller: ['$scope', '$element', '$attrs', '$timeout', function ($scope, $element, $attrs, $timeout) {
                $scope.setFocus = function () {
                    angular.element($element).find('input[type="text"]')[0].focus();
                };
            }],
            link: function (scope, element, attrs, controller) {
                var key = { backspace: 8, tab: 9, enter: 13, esc: 27, comma: 188 };
                var attr = '';
                scope.attrs = {
                    'id': '',
                    'inputid': '',
                    'placeholder': '',
                    'class': 'tags',
                    'maxlength': 20
                };
                for (var a in attrs) {
                    attr = a.replace('attr', '').toLowerCase();
                    if (a.indexOf('attr') === 0) {
                        scope.attrs[attr] = attrs[a];
                    }
                }

                element[0].addEventListener("keydown", function (e) {
                    var keycode = e.keyCode || e.which;
                    var $element = $($(this).find('input[type="text"]')[0]);
                    var value = $.trim($element.val());

                    if (keycode == key.enter || keycode == key.comma || keycode == key.tab) {
                        if (value != '') {
                            if (scope.tags.length > 0) {

                                var findTags = scope.tags.filter(function (tag) {
                                    return tag.name.toLowerCase().trim() === value.toLowerCase().trim();
                                });
                                if (findTags.length == 0) {
                                    addTag(value, $element);
                                }
                                else {
                                    var index = scope.tags.indexOf(findTags[0]);
                                    if (index > -1) {
                                        var badge = $element.siblings('.tag:eq(' + index + ')')
                                        badge.addClass('tag-warning')
                                        setTimeout(function () {
                                            $(badge).removeClass('tag-warning')
                                        }, 500)
                                    }
                                }
                            }
                            else {
                                addTag(value, $element);
                            }
                        }
                        $element.val('');
                        e.preventDefault();
                        $scopeApply();
                    }
                    else if (keycode == key.backspace && value == '') {
                        var count = $element.siblings('.tag').length;
                        if (count > 0) {
                            var tag = $element.siblings('.tag:eq(' + (count - 1) + ')');
                            if (tag.hasClass('tag-important')) {
                                var findTags = scope.tags.filter(function (item) {
                                    return item.name.toLowerCase().trim() === tag.data('tag').name.toLowerCase().trim();
                                });
                                if (findTags.length > 0) {
                                    var index = scope.tags.indexOf(findTags[0]);
                                    scope.tags.splice(index, 1);
                                    tag.remove();
                                }
                            }
                            else {
                                tag.addClass('tag-important');
                            }
                        }
                    }
                    else if (keycode == key.esc) {
                        $element.val('');
                        $element.siblings('.tag').removeClass('tag-important');
                    }
                    else {
                        $element.siblings('.tag').removeClass('tag-important');
                    }
                });

                var arrTemplate = [];
                for (var i = 0; i < template.length; i++) {
                    arrTemplate.push(template[i]);
                }
                //Compile Template
                element.append($compile(arrTemplate.join(''))(scope));
                //Bind Data
                if (scope.tags.length > 0) {
                    for (var i = 0; i < scope.tags.length; i++) {
                        createBadge(scope.tags[i].id, scope.tags[i].name, $($(element[0]).find('input[type="text"]')[0]));
                    }
                }

                function $scopeApply() {
                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                        scope.$apply();
                    }
                };
                function createBadge(id, value, element) {
                    $('<span/>', { 'class': 'tag' })
                    .data('tag', { id: id, name: value })
                    .text(value)
                    .append($('<button type="button" class="close">&times;</button>').on('click', function () {
                        var name = $(this).parent().data('tag').name.toLowerCase();
                        var findTags = scope.tags.filter(function (item) {
                            return item.name.toLowerCase().trim() === name.toLowerCase().trim();
                        });
                        if (findTags.length > 0) {
                            var index = scope.tags.indexOf(findTags[0]);
                            scope.tags.splice(index, 1);
                            $(this).parent().remove();
                        }
                    }))
                    .insertBefore(element);
                };
                function addTag(value, element) {
                    var id = 0;
                    if (scope.suggest.length > 0) {
                        var findValueIds = scope.suggest.filter(function (suggest) {
                            return suggest.name.toLowerCase().trim() === value.toLowerCase().trim();
                        });
                        if (findValueIds.length > 0) {
                            id = findValueIds[0].id;
                        }
                    }
                    scope.tags.push({ id: id, name: value });
                    createBadge(id, value, element);
                };
            }
        };
    }])
    .directive('currency', [function () {

        String.prototype.splice = function (idx, rem, s) {
            return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
        };

        function isEmpty(value) {
            return angular.isUndefined(value) || value === '' || value === null || value !== value;
        }

        var p = function (viewValue) {
            var nums = viewValue.toString().replace(/[^\d.]/g, '');
            return nums;
        };

        var f = function (modelValue, setdec) {
            setdec = setdec !== undefined ? setdec : true;
            var decimalSplit = modelValue.toString().split(".");
            var intPart = decimalSplit[0];
            var decPart = decimalSplit[1];

            intPart = (intPart == "" && setdec) ? "0" : intPart;
            intPart = intPart.replace(/[^\d]/g, '');
            if (intPart.length > 3) {
                var intDiv = Math.floor(intPart.length / 3);
                while (intDiv > 0) {
                    var lastComma = intPart.indexOf(",");
                    if (lastComma < 0) {
                        lastComma = intPart.length;
                    }

                    if (lastComma - 3 > 0) {
                        intPart = intPart.splice(lastComma - 3, 0, ",");
                    }
                    intDiv--;
                }
            }

            if (decPart === undefined) {
                if (setdec)
                    decPart = "";
                else
                    decPart = "";
            }
            else {
                if (setdec) {
                    if (decPart.length > 2)
                        decPart = decPart.slice(0, 2);
                    while (decPart.length < 2) {
                        decPart = decPart + "0"
                    }
                }
                decPart = "." + decPart;
            }

            return [intPart, decPart].join('');
        };

        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                scope.$watch(function () { return { min: attr.min } }, function () { ctrl.$setViewValue(ctrl.$viewValue); }, true);
                scope.$watch(function () { return { max: attr.max } }, function () { ctrl.$setViewValue(ctrl.$viewValue); }, true);

                var minValidator = function (value) {
                    var min = scope.$eval(attr.min) || 0;
                    if (!isEmpty(value) && value < min) {
                        ctrl.$setValidity('min', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('min', true);
                        return value;
                    }
                };

                var maxValidator = function (value) {
                    var max = scope.$eval(attr.max) || Infinity;
                    if (!isEmpty(value) && value > max) {
                        ctrl.$setValidity('max', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('max', true);
                        return value;
                    }
                };

                element.bind('keypress', function (e) {
                    var charCode = (typeof e.which == "number") ? e.which : e.keyCode,
                        currentValue = $(this).val(),
                        start = this.selectionStart,
                        end = this.selectionEnd;
                    var insertValue = charCode !== 0 ? String.fromCharCode(charCode) : '',
                        charCount = end - start;
                    var newValue = currentValue.splice(start, charCount, insertValue);

                    if (charCode == 0 || charCode == 8)
                        return;
                    if (String.fromCharCode(charCode).match(/[^\d.]/g)) {
                        e.preventDefault();
                        return;
                    }
                    if (currentValue.search(/(.*)\.[0-9][0-9]/) === 0 && (currentValue.length - 3) < start) {
                        e.preventDefault();
                        return;
                    }
                    if (newValue.split(".").length > 2 && charCode == 46) {
                        e.preventDefault();
                        return;
                    }
                });

                $(element).bind('blur paste', function (e) {
                    element.val(f($(this).val()));
                });

                $(element).bind('keyup', function (e) {
                    element.val(f($(this).val(), false));
                });

                ctrl.$parsers.unshift(f);
                ctrl.$formatters.unshift(f);
                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    }])
    .directive('numbersOnly', [function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    // this next if is necessary for when using ng-required on your input. 
                    // In such cases, when a letter is typed first, this parser will be called
                    // again, and the 2nd time, the value will be undefined
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
                var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110];
                element.bind("keydown", function (event) {
                    if ($.inArray(event.which, keyCode) == -1) {
                        scope.$apply(function () {
                            scope.$eval(attrs.onlyNum);
                            event.preventDefault();
                        });
                        event.preventDefault();
                    }

                });
            }
        };
    }])
    .directive('number', ['$filter', function ($filter) {
        return {
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function (a) {
                    if (attrs.number == 'empty' && ctrl.$modelValue == '') {
                        return ctrl.$modelValue;
                    }
                    else {
                        if (isNaN(ctrl.$modelValue)) return $filter('number')(ctrl.$modelValue)
                        return $filter('number')(Math.round(ctrl.$modelValue, 0))
                    }
                });

                ctrl.$parsers.unshift(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+]/g, '')
                    elem.val($filter('number')(plainNumber));
                    return plainNumber;
                });
            }
        };
    }])
    .directive('autoNumeric', [function () {
        'use strict';
        // Declare a empty options object
        var options = {};
        return {
            // Require ng-model in the element attribute for watching changes.
            require: '?ngModel',
            // This directive only works when used in element's attribute (e.g: cr-numeric)
            restrict: 'A',
            compile: function (tElm, tAttrs) {

                var isTextInput = tElm.is('input:text');

                return function (scope, elm, attrs, controller) {
                    // Get instance-specific options.
                    var opts = angular.extend({}, options, scope.$eval(attrs.autoNumeric));

                    // Helper method to update autoNumeric with new value.
                    var updateElement = function (element, newVal) {
                        // Only set value if value is numeric
                        if ($.isNumeric(newVal))
                            element.autoNumeric('set', newVal);
                    };

                    // Initialize element as autoNumeric with options.
                    elm.autoNumeric(opts);

                    // if element has controller, wire it (only for <input type="text" />)
                    if (controller && isTextInput) {
                        // watch for external changes to model and re-render element
                        scope.$watch(tAttrs.ngModel, function (current, old) {
                            controller.$render();
                        });
                        // render element as autoNumeric
                        controller.$render = function () {
                            updateElement(elm, controller.$viewValue);
                        }
                        // Detect changes on element and update model.
                        elm.on('change', function (e) {
                            scope.$apply(function () {
                                controller.$setViewValue(elm.autoNumeric('get'));
                            });
                        });
                    }
                    else {
                        // Listen for changes to value changes and re-render element.
                        // Useful when binding to a readonly input field.
                        if (isTextInput) {
                            attrs.$observe('value', function (val) {
                                updateElement(elm, val);
                            });
                        }
                    }
                }
            } // compile
        } // return
    }])
    .directive('ngEnter', [function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                var keycode = event.keyCode || event.which;
                if (keycode === 13) {

                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                        //scope.$apply();
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });
                    }
                    event.preventDefault();
                }
            });
        };
    }])
    .directive('slimscroll', function () {
        'use strict';
        return {
            restrict: 'A',
            link: function ($scope, $elem, $attr) {
                var off = [];
                var option = {};

                var refresh = function () {
                    if ($attr.slimscroll) {
                        option = $scope.$eval($attr.slimscroll);
                    } else if ($attr.slimscrollOption) {
                        option = $scope.$eval($attr.slimscrollOption);
                    }
                    $($elem).slimScroll({ destroy: true });
                    $($elem).slimScroll(option);
                };

                var init = function () {
                    refresh();

                    if ($attr.slimscroll && !option.noWatch) {
                        off.push($scope.$watchCollection($attr.slimscroll, refresh));
                    }

                    if ($attr.slimscrollWatch) {
                        off.push($scope.$watchCollection($attr.slimscrollWatch, refresh));
                    }

                    if ($attr.slimscrollListenTo) {
                        off.push($scope.$on($attr.slimscrollListenTo, refresh));
                    }
                };

                var destructor = function () {
                    off.forEach(function (unbind) {
                        unbind();
                    });
                    off = null;
                };

                off.push($scope.$on('$destroy', destructor));
                init();
            }
        };
    })
    .filter('abs', [function () {
        return function (input) {
            return Math.abs(input);
        };
    }])
    .filter('range', [function () {
        return function (input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    }])
    .directive('lazytabset', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            controller: function ($scope) {
                $scope.templateUrl = '';
                var tabs = $scope.tabs = [];
                var controller = this;

                this.selectTab = $scope.selectTab = function (tab, isExternalCall) {
                    angular.forEach(tabs, function (tab) {
                        tab.selected = false;
                    });
                    tab.selected = true;
                    if (isExternalCall) {
                        tab.isExternalCall = true;
                    }
                };

                this.setTabTemplate = function (templateUrl) {
                    $scope.templateUrl = templateUrl;
                }

                this.addTab = function (tab) {
                    if (tabs.length === 0) {
                        controller.selectTab(tab);
                    }
                    tabs.push(tab);
                };
            },
            template:
              '<div class="row-fluid">' +
                '<div class="row-fluid">' +
                  '<div class="nav nav-tabs" ng-transclude></div>' +
                '</div>' +
                '<div class="row-fluid">' +
                  '<ng-include src="templateUrl"></ng-include>' +
                '</div>' +
              '</div>'
        };
    })
    .directive('lazytab', function () {
        return {
            restrict: 'E',
            replace: true,
            require: '^lazytabset',
            scope: {
                icon: '@',
                title: '@',
                templateUrl: '@',
                isExternalCall: '@'
            },
            link: function (scope, element, attrs, tabsetController) {
                tabsetController.addTab(scope);

                scope.select = function () {
                    tabsetController.selectTab(scope);
                }

                scope.$watch('selected', function () {
                    if (scope.isExternalCall) {
                        scope.isExternalCall = false;
                        return;
                    }
                    if (scope.selected) {
                        tabsetController.setTabTemplate(scope.templateUrl);
                    }
                });
            },
            template:
              '<li ng-class="{active: selected}">' +
                '<a href="" ng-click="select()"><i class="blue bigger-120" ng-class="icon"></i> <span class="hidden-640">{{ title }}</span></a>' +
              '</li>'
        };
    });

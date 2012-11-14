(function($) {
    function getScrollBarWidth () {
        var inner = document.createElement('p');
        $(inner).css({
            width: '100%',
            height: '100%'
        });

        var outer = document.createElement('div');
        $(outer).css({
            position: "absolute",
            top: "0px",
            left: "0px",
            visibility: "hidden",
            width: "200px",
            height: "150px",
            overflow: "hidden"
        })
        outer.appendChild (inner);

        document.body.appendChild (outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild (outer);

        return (w1 - w2);
    };


    var scrollbarWidth = getScrollBarWidth();

    $.fn.createScrollableTable = function(options) {

        var defaults = {
            width: '400px',
            height: '300px',
            border: 'none',
            formatBufferCol: false
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            var table = $(this);
            prepareTable(table);
        });

        function prepareTable(table) {
            var tableId = table.attr('id') || options.id || 'scrolltable'

            // If the amount of columns varies then an invisible first row will need to be inserted in
            // the header table so that the widths can be set
            var tableInfo = tableColumnsVary(table);
            if (tableInfo.varying) {
                var firstRow = $(document.createElement('tr')).css({height: 0, overflow: 'hidden'});
                for(i = 0; i < tableInfo.cols; i++) {
                    firstRow.append(
                        $(document.createElement('th'))
                            .css({
                                background: 'transparent',
                                height: '0px',
                                overflow: 'hidden',
                                margin: 0,
                                padding: 0,
                                'line-height': '0px',
                                'font-size': '0px',
                            })
                            .attr('height', 0)
                    );
                }
            }


            // wrap the current table (will end up being just body table)
            var bodyWrap = table.wrap('<div></div>')
                .parent()
                .attr('id', tableId + '_body_wrap')
                .css({
                    width: '100%',
                    height: options.height,
                    overflow: 'auto',
                });

            // wrap the body
            var tableWrap = bodyWrap.wrap('<div></div>')
                .parent()
                .attr('id', tableId + '_table_wrap')
                .css({
                    width: '100%',
                    overflow: 'hidden',
                    display: 'inline-block',
                    border: options.border
                });

            // clone the header
            var headWrap = $(document.createElement('div'))
                .attr('Id', tableId + '_head_wrap')
                .prependTo(tableWrap)
                .css({
                    width: '100%',
                    overflow: 'hidden'
                });

            var headTable = table.clone(true)
                .attr('Id', tableId + '_head')
                .appendTo(headWrap)
                .css({
                    height: table.find('thead').height(),
                    'table-layout': 'fixed'
                })

            if (tableInfo.varying) {
                firstRow.prependTo(headTable.find('thead'));
            }


            var bufferCol = $(document.createElement('th'))
                .css({
                    'background': 'transparent',
                    'border': 0,
                    'width:': scrollbarWidth
                })
                .attr('width', scrollbarWidth + 'px')
                .appendTo(headTable.find('thead tr'));

            if (options.formatBufferCol) {
                $.each(bufferCol, function(i, el) {
                    //console.log($(col).css('background-color'));
                    var $el = $(el);
                    var $prevEl = $el.prev();
                    var cssProperties = {};
                    $.each([
                        'background', 'background-color', 'background-image',
                        'border-top', 'border-top-style', 'border-top-color', 'border-top-width',
                        'border-bottom', 'border-bottom-style', 'border-bottom-color', 'border-bottom-width'], function(j, cssProperty) {
                        cssProperties[cssProperty] = $prevEl.css(cssProperty);
                    });
                    $el.css(cssProperties);
                });
            }


            // remove the extra html
            headTable.find('tbody').remove();
            table.find('thead').remove();

            table.css({
                'border': 0
            });

            var sizeHeaders = function() {
                var allBodyCols = table.find('tbody tr:first td');
                // size the header columns to match the body
                var headers = headTable.find('thead tr th');
                headers.each(function(index) {
                    if (index < (headers.length -1)) {
                        var desiredWidth = getWidth($(allBodyCols[index]));
                        $(this).css({ width: desiredWidth + 'px' });
                    }
                });
            }

            sizeHeaders();
            $(window).resize(sizeHeaders);
        }

        function tableColumnsVary(table) {
            // return numbner of columns and if they vary over the table
            var cols = $(table).find('tr:first th').length;
            var prevCols = cols;
            var columnsChanged = false;

            $.each(table.find('tr'), function(index, row) {
                prevCols = cols;
                cols = Math.max(cols, $(row).find('th').length);
                columnsChanged |= (prevCols != cols);
            });
            return {
                'cols': cols,
                'varying': columnsChanged
            }
        }

        function getWidth(td) {
            if ($.browser.msie) { return $(td).outerWidth() }
            if ($.browser.mozilla) { return $(td).width(); }
            if ($.browser.safari) { return $(td).outerWidth(); }
            return $(td).outerWidth();
        };

        return $.each()

    };

})(jQuery);


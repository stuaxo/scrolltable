(function($) {
    $.fn.createScrollableTable = function(options) {

        var defaults = {
            width: '400px',
            height: '300px',
            border: 'none'
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
                    'table-layout': 'fixed',
                })

            if (tableInfo.varying) {
                firstRow.prependTo(headTable.find('thead'));
            }

            var bufferCol = $(document.createElement('th'))
                .css({
                    'background': 'transparent',
                    'border': 0
                })
                .appendTo(headTable.find('thead tr'));


            // remove the extra html
            headTable.find('tbody').remove();
            table.find('thead').remove();

            var allBodyCols = table.find('tbody tr:first td');
            var sizeHeaders = function() {
                // size the header columns to match the body
                headTable.find('thead tr th').each(function(index) {
                    var desiredWidth = getWidth($(allBodyCols[index]));
                    $(this).css({ width: desiredWidth + 'px' });
                    $(this).attr('width', desiredWidth);
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

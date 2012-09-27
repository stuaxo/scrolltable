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
            var tableId = table.attr('id');

            // wrap the current table (will end up being just body table)
            var bodyWrap = table.wrap('<div></div>')
                .parent()
                .attr('id', tableId + '_body_wrap')
                .css({
                    width: options.width,
                    height: options.height,
                    overflow: 'auto'
                });

            // wrap the body
            var tableWrap = bodyWrap.wrap('<div></div>')
                .parent()
                .attr('id', tableId + '_table_wrap')
                .css({
                    overflow: 'hidden',
                    display: 'inline-block',
                    border: options.border
                });

            // clone the header
            var headWrap = $(document.createElement('div'))
                .attr('Id', tableId + '_head_wrap')
                .prependTo(tableWrap)
                .css({
                    height: table.find('thead').height(),
                    width: options.width,
                    overflow: 'hidden'

                });

            var headTable = table.clone(true)
                .attr('Id', tableId + '_head')
                .appendTo(headWrap)
                .css({
                    'table-layout': 'fixed'
                });

            // remove the extra html
            headTable.find('tbody').remove();
            table.find('thead').remove();

            var sizeHeaders = function() {
                // size the header columns to match the body
                var allBodyCols = table.find('tbody tr:first td');
                headTable.find('thead tr th').each(function(index) {
                    var desiredWidth = getWidth($(allBodyCols[index]));
                    $(this).css({ width: desiredWidth + 'px' });
                });
            }

            sizeHeaders();

            $(window).resize(sizeHeaders);
        }

        function getWidth(td) {
            if ($.browser.msie) { return $(td).outerWidth() }
            if ($.browser.mozilla) { return $(td).width(); }
            if ($.browser.safari) { return $(td).outerWidth(); }
            return $(td).outerWidth();
        };

    };

})(jQuery);

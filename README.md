This is rcravens jquery scrolltable plugin with a couple of tweaks.


RCravens Original Blog Post and code.
http://blog.bobcravens.com/2010/01/html-scrolling-table-with-fixed-headers-jquery-plugin/

If you have any difficulty, I'd recommend using RCravens original code, as
it is much more widely tested.


Variable Column tables.

This version supports tables with a colspan in the first row.
If the table has a variable number of columns, a hidden row is prepended
containing the maximum number of columns, enabling width calculations to work.


Resize Handling:

On resize the header widths will be recalculated.


Other changes:

While the containing element still uses 'options.width', children use 
'100%', meaning less work for custom resize handlers.

The script will attempt to set the width of the  'buffer' column to the 
width of a scrollbar.



formatBufferCell

When set to true will set background, top and bottom borders of the buffer
cell to the same as the preceeding cell (defaults to false).



Troubleshooting:

If you have CSS rules that affect TH/TD width, margin or padding this may 
affect formatting in undersirable ways.

Moving rules to elements contained by TH/TDs can help, padding/margin can 
throw the width calculations out.
In these cases use the web inspector to compare whats happening in the
header and body tables.




This version only tested on IE8, Firefox 15, Chrome.



Table Scroll code - RCraven
http://blog.bobcravens.com/2010/01/html-scrolling-table-with-fixed-headers-jquery-plugin/

Scrollbar width from Alexander Gomez
http://www.alexandre-gomes.com/?p=115

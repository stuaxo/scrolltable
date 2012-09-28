This is rcravens jquery scrolltable plugin with some fixes that work for me.

RCravens Original Blog Post and code.
http://blog.bobcravens.com/2010/01/html-scrolling-table-with-fixed-headers-jquery-plugin/

If you have any difficulty, I'd recommend using RCravens original code, as it is
much more widely tested than this.


Variable Column tables.

The main change is to try and work with variable column tables, e.g. if you use colspan
at the top of a table.


Gotchas:
If your CSS contains rules for TH then you may end up styling the aditional tags in
unintended ways, particularly when using the variable.


Other changes:
Internal tables are 100% of the external div which is set to options.width, this
should make resize handler code easier to maintain.


This version only tested on IE8, Firefox 15, Chrome.



Code is RCravens, with a couple of changes.

http://blog.bobcravens.com/2010/01/html-scrolling-table-with-fixed-headers-jquery-plugin/

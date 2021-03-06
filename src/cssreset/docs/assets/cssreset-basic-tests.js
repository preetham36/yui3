YUI.add('cssreset-basic-tests', function(Y) {

    var suite = new Y.Test.Suite('cssreset-basic example test suite'),
        Assert = Y.Assert;

    suite.add(new Y.Test.Case({
        name: 'Example tests',
        'check H1 through H6 sizes': function() {
            var page = Y.one('#page'),
                h = page.all('h1, h2, h3, h4, h5, h6'),
                i = 0,
                size,
                viewPort = Y.one('body').get('viewportRegion').right;

            for (i = 0; i < h.size(); i+=1) {
                //alert(h.item(i).getHTML() + 'its computed fontsize: ' + h.item(i).getComputedStyle('fontSize')  + ' ..its fontsize: ' + h.item(i).getStyle('fontSize') + ' ..viewportRegion.right: ' + Y.one('body').get('viewportRegion').right );
                /*
                Encountered a strange IE bug:
                in IE 6,7,8 (but not 9)
                a node that is H1 - H6 .getComputedStyle('fontSize') === Y.one('body').get('viewportRegion').right + 'px'
                */
                size = h.item(i).getComputedStyle('fontSize');
                Assert.isTrue(((size === '16px') || (parseInt(size) === viewPort)), ' - Failed to set correct h1 - h6 fontsizes');
            }

        },
        'check margins and padding': function() {
            var page = Y.one('#page'),
                h = page.all('div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td'),
                i = 0,
                marg,
                pad;
                //alert( "Y.one('th').getComputedStyle('margin'): " + Y.one('th').getComputedStyle('margin'));
            for (i = 0; i < h.size(); i+=1) {
                //console.log(h.item(i).getComputedStyle('margin') + ' ...' + h.item(i).getHTML());
                marg = h.item(i).getComputedStyle('margin'); // IE8 is '0px' others are ''.   IE6 is "auto"
                pad = h.item(i).getComputedStyle('padding'); // IE8 is '0px' others are ''
                Assert.isTrue(((marg === '') || (marg === '0px') || (marg === 'auto')), ' - Failed to set margin to 0 ("") on ' + h.item(i).getHTML());
                Assert.isTrue(((pad === '') || (pad === '0px')), ' - Failed to set margin to 0 ("") on ' + h.item(i).getHTML());
            }
        },
        'check background-color is #ffffff': function() {
            Assert.areEqual('rgb(255, 255, 255)', Y.one('html').getComputedStyle('backgroundColor'), ' - Failed to set background-color to "rgb(255, 255, 255)" on html');

        },
        'check table border-collapse is "collapse"': function() {
            Assert.areEqual('collapse', Y.one('table').getComputedStyle('borderCollapse'), ' - Failed to set table border-collapse is "collapse"');

        },
        'check font normal': function() {
            var page = Y.one('#page'),
                h = page.all('address, caption, cite, code, dfn, em, strong, th, var '),
                i = 0,
                val,
                fweight;
                //alert( "Y.one('th').getComputedStyle('margin'): " + Y.one('th').getComputedStyle('margin'));
            for (i = 0; i < h.size(); i+=1) {
                fweight = h.item(i).getComputedStyle('fontWeight');

                Assert.areEqual('normal',  h.item(i).getComputedStyle('fontStyle'), ' - Failed to set font-style to "normal" on'  + h.item(i).getHTML());
                //Assert.areEqual('400',  h.item(i).getComputedStyle('fontWeight'), ' - Failed to set font-weight to "normal" on'  + h.item(i).getHTML());
                //alert('fweight: ' + fweight);
                Assert.isTrue(((fweight === '400') || (fweight === 400) || (fweight === 'normal')), ' - Failed to set font-style to "", or undefined');
            }
        },
        'check ul style': function() {
            var listStyle = Y.one('#page ul').getComputedStyle('listStyle');
            //alert('listStyle: ' + listStyle);
            Assert.isTrue(((listStyle === '') || (listStyle === undefined) || (listStyle === 'disc outside none') || (listStyle === 'none outside none')), ' - Failed to set list-style to "", or undefined');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', { requires: [ 'node', 'node-event-simulate' ] });

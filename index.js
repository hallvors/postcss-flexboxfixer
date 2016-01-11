var postcss = require( 'postcss' );

module.exports = postcss.plugin( 'postcss-flexboxfixer', function( opts ) {
    opts = opts || {};

    function getValueForProperty(parent, name, prefixAgnostic){
        var retValue;
        parent.walkDecls(name, function(decl){
            if(name === decl.prop){
                retValue = decl.value;
            }
            if(prefixAgnostic && postcss.vendor.unprefixed(decl.prop) === name){
                retValue = decl.value;
            }
        });
        return retValue;
    }


    function createFixupFlexboxDeclaration( propname, value, parent ) {
        // remove -webkit- prefixing from names, values
        if ( /^-webkit-/.test( propname ) ) {
            propname = propname.substr( 8 );
        }
        if ( /^-webkit-/.test( value ) ) {
            value = value.substr( 8 );
        }

        var mappings = {
            'display': {
            valueMap: {
                'box': 'flex',
                'flexbox': 'flex',
                'inline-box': 'inline-flex',
                'inline-flexbox': 'inline-flex'
            }
        },
            'box-align': {
            newName: 'align-items',
            valueMap: {
                'start': 'flex-start',
                'end': 'flex-end'
            }
        },
            'flex-direction': {
            valueMap: {
                'lr': 'row',
                'rl': 'row-reverse',
                'tb': 'column',
                'bt': 'column-reverse'
            }
        },
            'box-pack': {
                newName: 'justify-content',
                valueMap: {
                    'start': 'flex-start',
                    'end': 'flex-end',
                    'justify': 'space-between'
                }
            },
            'box-ordinal-group': {
            newName: 'order',
            valueMap: {}
        },
            'box-flex': {
            newName: 'flex',
            valueMap: {}
        }
        };

        // 2009 => 2011
        mappings['flex-align'] = mappings['box-align'];
        // 2009 => 2011
        mappings['flex-order'] = mappings['box-ordinal-group'];

        if ( propname in mappings ) {
            if ( value in mappings[propname].valueMap ) {
                value = mappings[propname].valueMap[value];
            }
            propname = mappings[propname].newName || propname;
        }

        // some stuff is more complicated than a simple substitution..
        // box-flex:0 maps to 'none', other values need 'auto' appended - thanks to Daniel Holbert
        if ( propname === 'flex' ) {
            if ( value === 0 ) {
                value = 'none';
            }else {
                value = value + ' auto';
            }
        }

        // box-direction, box-orient is a bit of a mess - these two 2009 draft values turn into 2011's flex-direction, which again has different values for final spec
        if ( propname === 'box-direction' || propname === 'box-orient' ) {
            var dir, orient;
            if ( propname === 'box-direction' ) {
                dir = value;
                orient = getValueForProperty( parent, 'box-orient', true );
            }else {
                orient = value;
                dir = getValueForProperty( parent, 'box-direction', true );
            }

            // horizontal,normal => row, vertical,normal => column. horizontal,reverse => row-reverse etc..
            // lr, rl etc are handled by the simpler mapping above, so we don't need to worry about those
            value = orient === 'vertical' ? 'column' : 'row';
            if ( dir === 'reverse' ) {
                value += '-reverse';
            }
            propname = 'flex-direction';
        }

        return { type: 'declaration', property: propname, value: value };
    }


    return function( css ) {
        css.walkDecls( /(^-webkit-box|^-webkit-flex|^display$)/, function( decl ) {
            if(decl.prop === 'display' && decl.value.indexOf('-webkit-') !== 0){
                /* if it's not a -webkit- prefixed display property, we don't worry about it */
                return;
            }
            var fixedDecl = createFixupFlexboxDeclaration(decl.prop, decl.value, decl.parent);
            /* we only add fixup rules if there's no equivalent rule in the CSS rule set already.. */
            if(getValueForProperty(decl.parent, decl.prop, false) !== fixedDecl.value){
                decl.cloneAfter({'prop':fixedDecl.property, 'value':fixedDecl.value});
            }
        } );


    };



} );

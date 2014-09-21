module.exports = {
	
	/*
		From a model soughtModel like "MG4R2LL/A" returns a string like "iPhone 6 AT&T Gray 128".
		Use it like: console.log("prettyName:" + models.prettyNameFromModel(iphone6['att']['gray']['128']))
	*/
	prettyNameFromModel: function(soughtModel) {
		var traverse = function(obj, nameStack) {
			if (nameStack == null)
				nameStack = [];
			//console.log('traversing obj:', obj);
			var propertyNames = Object.getOwnPropertyNames(obj);
			//console.log('found propertyNames:', propertyNames);
			for (var idx = 0; idx < propertyNames.length; idx++) {
				var propertyName = propertyNames[idx];
				var propertyValue = obj[propertyName];
				//console.log(propertyName, '->', propertyValue.toString() + ' (' + typeof propertyValue + ')');
				
				// use a pretty name if this object has it: 
				var prettyName;
				if (propertyValue != null && typeof propertyValue['name'] === 'string') {
					prettyName = propertyValue['name'];
				} else {
					prettyName = propertyName.charAt(0).toUpperCase() + propertyName.substring(1);
				}
				nameStack.push(prettyName);

				if (typeof propertyValue === 'string'){
					if (propertyValue == soughtModel) {
						return prettyNameFromStack(nameStack);
					}
				} else if (typeof propertyValue === 'object') {
					var traverseResult = traverse(propertyValue, nameStack);
					if (traverseResult != null)
						return traverseResult;
				}
				nameStack.pop();
			}
			// if we got here the model wasn't found on this object:
			return null;
		};
		var prettyNameFromStack = function(nameStack) {
			return nameStack.join(' ');
		}
		return traverse(this);
	},

	'iphone-6': {
		name: 'iPhone 6',
		'tmobile' : {
			name: 'T-Mobile',
			gold: {
				'128': 'MG592LL/A',
				'64': 'MG5D2LL/A',
				'16': 'MG562LL/A',
			},
			silver:	{
				'128': 'MG582LL/A',
				'64': 'MG5C2LL/A',
				'16': 'MG552LL/A',
			},
			gray:	{
				'128': 'MG572LL/A',
				'64': 'MG5A2LL/A',
				'16': 'MG542LL/A',
			},
		},
		'att' : {
			name: 'AT&T',
			gold: {
				'128': 'MG4V2LL/A',
				'64': 'MG502LL/A',
				'16': 'MG4Q2LL/A',
			},
			silver:	{
				'128': 'MG4U2LL/A',
				'64': 'MG4X2LL/A',
				'16': 'MG4P2LL/A',
			},
			gray:	{
				'128': 'MG4R2LL/A',
				'64': 'MG4W2LL/A',
				'16': 'MG4N2LL/A',
			},
		},
		'verizon' : {
			name: 'Verizon',
			gold: {
				'128': 'MG622LL/A',
				'64': 'MG652LL/A',
				'16': 'MG5Y2LL/A',
			},
			silver:	{
				'128': 'MG612LL/A',
				'64': 'MG642LL/A',
				'16': 'MG5X2LL/A',
			},
			gray:	{
				'128': 'MG602LL/A',
				'64': 'MG632LL/A',
				'16': 'MG5W2LL/A',
			},
		},
		'sprint' : {
			name: 'Sprint',
			gold: {
				'128': 'MG6F2LL/A',
				'64': 'MG6J2LL/A',
				'16': 'MG6C2LL/A',
			},
			silver:	{
				'128': 'MG6E2LL/A',
				'64': 'MG6H2LL/A',
				'16': 'MG6A2LL/A',
			},
			gray:	{
				'128': 'MG6D2LL/A',
				'64': 'MG6G2LL/A',
				'16': 'MG692LL/A',
			},
		},
	},
	'iphone-5s': {
		name: 'iPhone 5S',
		'att' : {
			name: 'AT&T',
			gold: {
				'64': 'ME313LL/A',
				'32': 'ME310LL/A',
				'16': 'ME307LL/A',
			},
			silver:	{
				'64': 'ME312LL/A',
				'32': 'ME309LL/A',
				'16': 'ME306LL/A',
			},
			gray:	{
				'64': 'ME311LL/A',
				'32': 'ME308LL/A',
				'16': 'ME305LL/A',
			},
		},
		'verizon' : {
			name: 'Verizon',
			gold: {
				'64': 'ME349LL/A',
				'32': 'ME346LL/A',
				'16': 'ME343LL/A',
			},
			silver:	{
				'64': 'ME348LL/A',
				'32': 'ME345LL/A',
				'16': 'ME342LL/A',
			},
			gray:	{
				'64': 'ME347LL/A',
				'32': 'ME344LL/A',
				'16': 'ME341LL/A',
			},
		},
		'sprint' : {
			name: 'Sprint',
			gold: {
				'64': 'ME358LL/A',
				'32': 'ME355LL/A',
				'16': 'ME352LL/A',
			},
			silver:	{
				'64': 'ME357LL/A',
				'32': 'ME354LL/A',
				'16': 'ME351LL/A',
			},
			gray:	{
				'64': 'ME356LL/A',
				'32': 'ME353LL/A',
				'16': 'ME350LL/A',
			},
		},
		'tmobile' : {
			name: 'T-Mobile',
			gold: {
				'64': 'ME331LL/A',
				'32': 'ME328LL/A',
				'16': 'ME325LL/A',
			},
			silver:	{
				'64': 'ME330LL/A',
				'32': 'ME327LL/A',
				'16': 'ME324LL/A',
			},
			gray:	{
				'64': 'ME329LL/A',
				'32': 'ME326LL/A',
				'16': 'ME323LL/A',
			},
		}
	},
	'ipad-air': {
		name: 'iPad Air',
		wifi : {
			name: 'Wi-Fi only',
			gray : {
				'16':	'MD785LL/A',
				'32':	'MD786LL/A',
				'64':	'MD787LL/A',
				'128':	'ME898LL/A'
			},
			silver : {
				'16':	'MD788LL/A',
				'32':	'MD789LL/A',
				'64':	'MD790LL/A',
				'128':	'ME906LL/A'
			}
		},
		att : {
			name: 'AT&T Wi-Fi + Cellular',
			gray : {
				'16':	'ME991LL/A',
				'32':	'MF003LL/A',
				'64':	'MF009LL/A',
				'128':	'MF015LL/A'
			},
			silver : {
				'16':	'ME997LL/A',
				'32':	'MF529LL/A',
				'64':	'MF012LL/A',
				'128':	'MF018LL/A'
			}
		},
		sprint : {
			name: 'Sprint Wi-Fi + Cellular',
			gray : {
				'16':	'MF020LL/A',
				'32':	'MF024LL/A',
				'64':	'MF026LL/A',
				'128':	'MF028LL/A'
			},
			silver : {
				'16':	'MF021LL/A',
				'32':	'MF025LL/A',
				'64':	'MF027LL/A',
				'128':	'MF029LL/A'
			}
		},
		tmobile : {
			name: 'T-Mobile Wi-Fi + Cellular',
			gray : {
				'16':	'MF496LL/A',
				'32':	'MF520LL/A',
				'64':	'MF534LL/A',
				'128':	'MF558LL/A'
			},
			silver : {
				'16':	'MF502LL/A',
				'32':	'MF527LL/A',
				'64':	'MF539LL/A',
				'128':	'MF563LL/A'
			}
		},
		verizon : {
			name: 'Verizon Wi-Fi + Cellular',
			gray : {
				'16':	'ME993LL/A',
				'32':	'MF004LL/A',
				'64':	'MF010LL/A',
				'128':	'MF016LL/A'
			},
			silver : {
				'16':	'ME999LL/A',
				'32':	'MF532LL/A',
				'64':	'MF013LL/A',
				'128':	'MF019LL/A'
			}
		}
	},
	'ipad-mini-retina':  {
		name: 'iPad mini with Retina display',
        wifi : {
            name: 'Wi-Fi only',
            gray : {
                '16':   'ME276LL/A',
                '32':   'ME277LL/A',
                '64':   'ME278LL/A',
                '128':  'ME856LL/A'
            },
            silver : {
                '16':   'ME279LL/A',
                '32':   'ME280LL/A',
                '64':   'ME281LL/A',
                '128':  'ME860LL/A'
            }
        },
        att : {
            name: 'AT&T Wi-Fi + Cellular',
            gray : {
                '16':   'MF066LL/A',
                '32':   'MF080LL/A',
                '64':   'MF086LL/A',
                '128':  'MF116LL/A'
            },
            silver : {
                '16':   'MF074LL/A',
                '32':   'MF083LL/A',
                '64':   'MF089LL/A',
                '128':  'MF120LL/A'
            }
        },
        sprint : {
            name: 'Sprint Wi-Fi + Cellular',
            gray : {
                '16':   'MF070LL/A',
                '32':   'MF082LL/A',
                '64':   'MF088LL/A',
                '128':  'MF118LL/A'
            },
            silver : {
                '16':   'MF076LL/A',
                '32':   'MF085LL/A',
                '64':   'MF091LL/A',
                '128':  'MF123LL/A'
            }
        },
        tmobile : {
            name: 'T-Mobile Wi-Fi + Cellular',
            gray : {
                '16':   'MF519LL/A',
                '32':   'MF552LL/A',
                '64':   'MF575LL/A',
                '128':  'MF585LL/A'
            },
            silver : {
                '16':   'MF544LL/A',
                '32':   'MF569LL/A',
                '64':   'MF580LL/A',
                '128':  'MF594LL/A'
            }
        },
        verizon : {
            name: 'Verizon Wi-Fi + Cellular',
            gray : {
                '16':   'MF069LL/A',
                '32':   'MF081LL/A',
                '64':   'MF087LL/A',
                '128':  'MF117LL/A'
            },
            silver : {
                '16':   'MF075LL/A',
                '32':   'MF084LL/A',
                '64':   'MF090LL/A',
                '128':  'MF121LL/A'
            }
        }
    }
};
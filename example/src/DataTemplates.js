var leafTemplate = {
    min: 1,
    max: 5,
    template: {
        name: {
            pattern: 'lastName'
        }
    }
};

export default {
    bar: {
        apples: {
            min: 4,
            max: 5,
            template: {
                v: {
                    min: 10,
                    max: 50
                },
                name: {
                    format: 'apple'
                }
            }
        },
        bananas: {
            min: 4,
            max: 5,
            template: {
                v: {
                    min: 30,
                    max: 70
                },
                name: {
                    format: 'banana'
                }
            }
        },
        grapes: {
            min: 4,
            max: 5,
            template: {
                v: {
                    min: 10,
                    max: 30
                },
                name: {
                    format: 'grape'
                }
            }
        }
    },
    pie: {
        data: {
            min: 5,
            max: 5,
            template: {
                name: {
                    pattern: 'brState'
                },
                population: {
                    min: 10000,
                    max: 10000000
                }
            }
        }
    },
    radar: {
        speed: {
            min: 10,
            max: 100
        },
        balance: {
            min: 10,
            max: 100
        },
        explosives: {
            min: 10,
            max: 100
        },
        energy: {
            min: 10,
            max: 100
        },
        flexibility: {
            min: 10,
            max: 100
        },
        agility: {
            min: 10,
            max: 100
        },
        endurance: {
            min: 10,
            max: 100
        }
    },
    stockLine: {
        data: {
            min: 80,
            max: 80,
            template: {
                title: {
                    pattern: 'brState'
                },
                a: {
                    min: 10000,
                    max: 100000,
                    places: 0
                },
                b: {
                    min: 50000,
                    max: 200000,
                    places: 0
                },
                c: {
                    min: 100000,
                    max: 300000,
                    places: 0
                }
            }
        }
    },
    tree: {
        name: {
            format: 'Root'
        },
        children: {
            min: 3,
            max: 6,
            template: {
                name: {pattern: 'brState'},
                children: leafTemplate
            }
        }
    }
}
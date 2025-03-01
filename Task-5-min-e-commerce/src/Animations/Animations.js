const Animations = {

    opacityVariants: {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 0.3, staggerChildren : 0.3, delayChildren: 0.2}},
        exit: {opacity: 0, transition: {duration: 0.3}}
    },

    opacityVariantsNoStagger: {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 0.3}},
        exit: {opacity: 0, transition: {duration: 0.3}}
    },

    toTopVariants: {
        hidden: {opacity: 0, y:50},
        visible: {opacity: 1, y: 0, transition: {duration: 0.3}},
    },

    displayList: {
        hidden: {opacity:0, height: 0},
        visible: {opacity: 1, height: 'fit-content', transition: {duration: 0.3}},
        exit: {opacity: 0, height: 0, transition: {duration: 0.3}}
    },

    loadingVariants: {
        hidden: {opacity: 0.5},
        visible: {opacity: 1, transition : {type : 'wheel' , duration : 2 , repeat : Infinity , repeatType : 'mirror'}}
    }

};

export default Animations;
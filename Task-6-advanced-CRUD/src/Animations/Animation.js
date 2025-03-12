const Animations = {

    displayList: {
        hidden: {opacity:0, height: 0},
        visible: {opacity: 1, height: 'fit-content', transition: {duration: 0.3}},
        exit: {opacity: 0, height: 0, transition: {duration: 0.3}}
    },

    opacityVariantsNoStagger: {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 0.3}},
        exit: {opacity: 0, transition: {duration: 0.3}}
    },

    scaleVariants: {
        hidden: {opacity:0, scale: 0.5},
        visible: {opacity: 1, scale: 1, transition: {duration: 0.3}},
    },

    loadingVariants: {
        hidden: {opacity: 0.5},
        visible: {opacity: 1, transition : {type : 'wheel' , duration : 1.5 , repeat : Infinity , repeatType : 'mirror'}}
    }

}

export default Animations;
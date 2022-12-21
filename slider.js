function easySlider() {

    // object connection example
    const nameSlider = document.querySelector('.example-class-slider');
    if (nameSlider) {
        const nameSlides = document.querySelectorAll('.example-class-slides');
        const nameSliderarrowLeft = document.getElementById('example-class-left');
        const nameSliderarrowRight = document.getElementById('rexample-class-right');        
        contentCompactSliderInitial (nameSlides, nameSliderarrowLeft, nameSliderarrowRight);
        // ..or
        contentGlobalSliderInitial (nameSlides, nameSliderarrowLeft, nameSliderarrowRight);

    }

    // ...repeat this 

   
    // ------------- Logic

    // OPTION 1. selector overriding option

    function contentGlobalSliderInitial(label ,button, direction) {
        button.forEach(slideButton => {
            slideButton.addEventListener('click', function (e) {
                const contentSliders = document.querySelectorAll(label);
                const contentSlidersLength = contentSliders.length - 1;
                const contentActiveSlideNumber = findActiveSlide(contentSliders);
                
                if (direction) {
                    slideRightMoveFunc(contentActiveSlideNumber, contentSlidersLength, contentSliders)

                } else {
                    slideLeftMoveFunc(contentActiveSlideNumber, contentSlidersLength, contentSliders) 
                }                
            });   
        });
    }

    // OPTION 2. selector not overriding option

    function contentCompactSliderInitial(slideList, leftArrow, rightArrow) {
        const slideLength = slideList.length - 1;

        if (slideList.length > 1) {
            slideList.forEach(slide => {
                let event = null;
                let moveSize = 0;
    
                slide.addEventListener("touchstart", function (e) {
                    event = e;
                });
                slide.addEventListener("touchmove", function (e) {               
                    if (event) {                   
                        moveSize = e.touches[0].pageX - event.touches[0].pageX; 
                    } 
                          
                });
                slide.addEventListener("touchend", function (e) {
                    const activeSlide = findActiveSlide(slideList);
                         
                    if (moveSize < -100) {
                        slideRightMoveFunc(activeSlide, slideLength, slideList);    
                    }
                    if (moveSize > 100) {
                        slideLeftMoveFunc(activeSlide, slideLength, slideList); 
                    }
                    if (e.cancelable) {
                        e.preventDefault();
                     }           
                    event = null;
                });
            });    
            if (rightArrow) {
                rightArrow.addEventListener('click', function (e) {
                    const activeSlide = findActiveSlide(slideList);
                    slideRightMoveFunc(activeSlide, slideLength, slideList);
                });
            }
            if (leftArrow) {  
                leftArrow.addEventListener('click', function (e) {
                    const activeSlide = findActiveSlide(slideList)
                    slideLeftMoveFunc(activeSlide, slideLength, slideList);
                })   
            } 
        } else {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
            const contentPagination = document.querySelector('.content-pagination');
            contentPagination.style.display = 'none';
        }



    }

    
    // Arrow wrappers

    function slideRightMoveFunc(activeSlide, slideLength, slideList) {
        if (activeSlide === slideLength) {
            animateSliderIn(slideList[activeSlide], slideList[0])
        } else {
            animateSliderIn(slideList[activeSlide], slideList[activeSlide + 1])
        }
    }

    function slideLeftMoveFunc(activeSlide, slideLength, slideList) {
        if (activeSlide === 0) {
            animateSliderIn(slideList[activeSlide], slideList[slideLength])
        } else {
            animateSliderIn(slideList[activeSlide], slideList[activeSlide - 1])
        }
    }


    // Modules

    // Found active slider
    function findActiveSlide(arr) {
        let slideCounter = 0;
        arr.forEach((item, index) => {
            if ((item.classList.value).indexOf('active') > 0) {
                slideCounter = index;
            }
        });
        return slideCounter
    }

    // Here we write the animation logic, if there are not enough features
    function animateSliderIn(lastObj, slideObj) {
            lastObj.classList.remove('active');
            slideObj.classList.add('active');
    }


}

module.exports = slider;
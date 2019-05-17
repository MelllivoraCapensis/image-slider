const imagesList = [
	    {
	    	src: 'App/img/body-back.png',
	    	label: 'First Image'
	    },
	    {
	    	src: 'App/img/body-back1.png',
	    	label: 'Second Image'
	    },
	    {
	    	src: 'App/img/body-back2.png',
	    	label: 'Third Image'
	    },
	    {
	    	src: 'App/img/body-back3.png',
	    	label: 'Fourth Image'
	    },
	    {
	    	src: 'App/img/body-back4.png',
	    	label: 'Fifth Image'
	    }
	    ,
	    {
	    	src: 'App/img/body-back1.png',
	    	label: 'Second Image'
	    },
	    {
	    	src: 'App/img/body-back2.png',
	    	label: 'Third Image'
	    },
	    {
	    	src: 'App/img/body-back3.png',
	    	label: 'Fourth Image'
	    },
	    {
	    	src: 'App/img/body-back4.png',
	    	label: 'Fifth Image'
	    }
    ];

new SliderList (document.querySelector('.slider-wrapper'),
	imagesList, 600, 100, 150, 5, false);

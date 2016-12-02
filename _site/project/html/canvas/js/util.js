define(() => {
	const isCanvas = () => !!document.createElement('canvas');
	const getCanvas = id => document.getElementById(id || 'canvas');
	const getElement = id => document.getElementById(id);

	return {
		isCanvas:   isCanvas, 
		getCanvas:  getCanvas,
		getElement: getElement
	};
});



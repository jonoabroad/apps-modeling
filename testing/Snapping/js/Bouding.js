/*
 * 
 */
function Bouding()
{	

	/* set und get der Position der Elemente
    ui.BBTransX.set(pos.x.toFixed(3));
    ui.BBTransY.set(pos.y.toFixed(3));
    ui.BBTransZ.set(pos.z.toFixed(3));

    ui.BBTransX.get();
    ui.BBTransY.get();
    ui.BBTransZ.get();   
	*/
	
	this.init = function()
	{
		var selectID = [];
		var pfad = './x3d/JsonFiles/Box.json';
		
		selectID = primitiveManager.getIDList();
		
		for(var i = 0; i < selectID.length; i++)
		{
			/*
			 * JSON gibt mir die Punktkoordinaten
			 * in jeder diese Koordinaten erzeuge ich
			 * mit boundingPoint eine Bindungskugel
			 */
			loadJSON(selectID[i], pfad);
		}
	};
	
	/* Zeichnet die BoudingPunkte */
    function boundingPoint(id, pfad, position)
    {    	
    	var transform = document.createElement('Transform');
    	var transform_S = document.createElement('Shape');
    	var transform_S_A = document.createElement('Appearance');
    	var transform_S_A_M = document.createElement('Material');    	
    	var transform_S_A_M_S = document.createElement('Sphere');
    	
    	transform_S_A_M_S.setAttribute('radius', '0.025');
    	transform_S_A_M.setAttribute('diffuseColor', '#3FFFFF');
    	transform.setAttribute('translation', position);
    	transform.setAttribute('id', 'boundingPoint');
    	
    	transform_S_A.appendChild( transform_S_A_M );
    	transform_S.appendChild( transform_S_A_M_S );
    	transform_S.appendChild( transform_S_A );
    	transform.appendChild( transform_S );
    	
    	var element = document.getElementById(id);
    	element.appendChild(transform);
    };
    
    /* Zeichnet die Normale */
    function boundingNormale(id, pfad, position)
    {		
		/* Cylinder */	
    	var transform = document.createElement('Transform');
    	var transform_S = document.createElement('Shape');
    	var transform_S_A = document.createElement('Appearance');
    	var transform_S_A_M = document.createElement('Material');    	
    	var transform_S_A_M_S = document.createElement('Cylinder');
    	
    	transform_S_A_M_S.setAttribute('radius', '0.005');
    	transform_S_A_M_S.setAttribute('height', '1.0');
    	    	    	
    	transform_S_A_M.setAttribute('diffuseColor', '#3FFFFF');
    	transform.setAttribute('rotation', '0 0 1 -1.57079');
    	transform.setAttribute('translation', position);
    	transform.setAttribute('id', 'normale');

    	transform_S_A.appendChild( transform_S_A_M );
    	transform_S.appendChild( transform_S_A_M_S );    	
    	transform_S.appendChild( transform_S_A );
    	transform.appendChild( transform_S );
    	
    	
    	/* Cone */
    	var transform2 = document.createElement('Transform');
    	var transform_S2 = document.createElement('Shape');
    	var transform_S_A2 = document.createElement('Appearance');
    	var transform_S_A_M2 = document.createElement('Material');    	
    	var transform_S_A_M_S2 = document.createElement('Cone');
    	
    	transform_S_A_M_S2.setAttribute('height', '0.05');
    	transform_S_A_M_S2.setAttribute('bottomRadius', '0.05');
    	    	    	
    	transform_S_A_M2.setAttribute('diffuseColor', '#3FFFFF');
    	transform2.setAttribute('rotation', '0 0 1 -1.57079');
    	transform2.setAttribute('translation', '1.5 0 0');
    	transform2.setAttribute('id', 'normale');

    	transform_S_A2.appendChild( transform_S_A_M2 );
    	transform_S2.appendChild( transform_S_A_M_S2 );    	
    	transform_S2.appendChild( transform_S_A2 );
    	transform2.appendChild( transform_S2 );
    	
    	
    	var element = document.getElementById(id);
    	element.appendChild(transform2);
    	element.appendChild(transform);
    };
    
	function loadJSON(id, pfad)
    {
	    // json-string laden
		var json = GetHttpText(pfad);
		
		// aus dem string ein Array bilden
		var jsonObj = eval ('(' + json + ')');
		
		// die Arrays koennen dann wie folgt aufgerufen werden points[0]
		var points = jsonObj.snapPoints;		
		
		for(var i = 0; i < points.length-1; i++)
		{
			//Zeugen der bounding Points
			boundingPoint(id, pfad, points[i].toString());
			console.log(points[i].toString());
		}
		
		for(var i = points.length-1; i < points.length; i++)
		{
			//Erzeugt die Normale
			boundingNormale(id, pfad, points[i].toString());
			console.log(points[i].toString());	
		}
    };

	
	function GetHttpText(url) 
	{
		if (window.XMLHttpRequest) 
		{
			vHTTPReq = new XMLHttpRequest();
		}
		else 
		{
			vHTTPReq = new ActiveXObject("Microsoft.XMLHTTP"); // IE 5 / 6
		}
	
		/// get content
		vHTTPReq.open("GET", url, false);
		vHTTPReq.send();
	
		return vHTTPReq.responseText;
	};
	
}

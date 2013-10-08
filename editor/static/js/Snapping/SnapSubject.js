/*
 * Subject class for the Observer design pattern
 */
function SnapSubject()
{
	this.observers = new SnappingArray();
}

// reports the event context to all Objects
SnapSubject.prototype.Report = function( )
{
	var count = this.observers.ArrayLength();
};


// Add new Observer Element
SnapSubject.prototype.AddObserver = function( observer )
{
	if( !observer.Update )
	{
		throw 'Wrong parameter';
	}
	
	// Observer added to Observerlist
	this.observers.SetArrayObject( observer );
};


// Remove Observer from Element-List
SnapSubject.prototype.RemoveObserver = function( observer )
{
	if( !observer.Update )
	{
		throw 'Wrong parameter';
	}
	
	this.observers.RemoveArrayObject( observer );
};
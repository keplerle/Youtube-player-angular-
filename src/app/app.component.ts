import { Component,AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: `./main.html`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
	title="Youtube Player";
	history="History";
	welcome="Welcome on Youtube Player";
	demo="Type the URL of the embedded Youtube video you want to watch.";
	indicator="You have 0 bookmarks";
	addBookmarkbutton="Add a bookmark";
	displayBookmarksbutton="Display bookmarks";
	developer="Developed by: Képler LE";
	
	//onLoad
	ngAfterViewInit(){
		this.loadAll();
	}
	//Submit the URL and add the request in the history
	submitURL() {
		//Get the URL
		let x= (document.getElementById("inputUrl") as HTMLTextAreaElement).value;
		let histo = document.getElementById("listHisto");
		if(x){
			//Set the source of the iframe
			document.getElementById("videoSquare").setAttribute("src",x);
			//Add the request in the history
			if (typeof(Storage) !== "undefined") {
				if (localStorage.history) 
				{
					localStorage.history=localStorage.history+"|"+x;
				} else{
					localStorage.history=x;
				}
				//Refresh the history
				let col=document.getElementById("colh");
				col.removeChild(histo);
				histo=document.createElement("div");
				histo.setAttribute("id","listHisto");
				col.appendChild(histo);
				this.loadHistory();
			} else {
				document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
			}
		}
	}
	//Load the history
	loadHistory() {
		// Check browser support
		if (typeof(Storage) !== "undefined") {
			//localStorage.removeItem("history");
			if (localStorage.history) 
			{		
				let histTemp=localStorage.history.split('|');
				let i;
				for(i =0; i < histTemp.length; i++){
					let histo = document.getElementById("listHisto");
					let para=document.createElement("p");
					let item = document.createElement("a");
					item.setAttribute("href","#");
					item.innerHTML=histTemp[i];
					item.addEventListener("click",function(){document.getElementById("videoSquare").setAttribute("src",item.innerHTML)});
					para.appendChild(item);
					histo.insertBefore(para,histo.childNodes[0]); 
				}
			}
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}
	}
	//Load the list of bookmarks
	loadBookmarks() {
		// Check browser support
		if (typeof(Storage) !== "undefined") {
			//localStorage.removeItem("bookmarks");
			if (localStorage.bookmarks) 
			{
				let bookmarksTemp=localStorage.bookmarks.split('|');
				document.getElementById("indicator").innerHTML = "You have "+bookmarksTemp.length+" bookmarks.";
			}
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}
	}

	loadAll(){
		this.loadHistory();
		this.loadBookmarks();
	}
	//Add a bookmark
	addBookmark() {
		let url=document.getElementById("videoSquare").getAttribute("src");
		if (typeof(Storage) !== "undefined") {
			if (url) 
			{
				if (localStorage.bookmarks) 
				{
					localStorage.bookmarks=localStorage.bookmarks+"|"+url;		
				} else{
					localStorage.bookmarks=url;
				}
			this.loadBookmarks();
			}
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}	
	}
	//Display the list of bookmarks	
	displayBookmarks() {
		// Check browser support
		if (typeof(Storage) !== "undefined") {
			if (localStorage.bookmarks) 
			{
				let fav = document.getElementById("listBookmarks");
				let col=document.getElementById("colbm");
				col.removeChild(fav);
				fav=document.createElement("div");
				fav.setAttribute("id","listBookmarks");
				col.appendChild(fav);
				let bookmarksTemp=localStorage.bookmarks.split('|');
				let i;
				for(i =0; i < bookmarksTemp.length; i++){
					let para=document.createElement("p");
					let item = document.createElement("a");
					item.setAttribute("href","#");
					item.innerHTML=bookmarksTemp[i];
					item.addEventListener("click",function(){document.getElementById("videoSquare").setAttribute("src",item.innerHTML);});
					para.appendChild(item);
					fav.insertBefore(para,fav.childNodes[0]); 
				}
			}
		} else {
			document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
		}
	}
}

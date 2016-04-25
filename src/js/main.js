import { Observable as $ } from 'rx';
import { div, br, i, button, h1, h2, h4 ,ul, li, img} from '@cycle/dom';
import { Button } from './helpers';

export default ({ DOM, HTTP }) => {
   
    const DISCIPLINE_URL ='http://localhost:8000/api/discipline';
  	let request$ = $.just({
			url: DISCIPLINE_URL,      
			category: 'dicipline',
      		method: 'GET'}); // GET by default   

let dicipline$ = HTTP
    .filter(res$ => res$.request.category === 'dicipline')
    .mergeAll()
    .map(res => res.body);
    
              
	return {
		DOM: dicipline$
                //  .do(
                //          function (x)   { console.log('Disciplines:', x); }
                //      )
                .map((result$) =>
                            div(".content",[
                                div(".row", [ div(".col-md-12 .head", [h1("Olymics Disciplines")]) ]),
                                div(".row",[
                                    // div(".col-md-3", [
                                    //     //mainForm
                                    // ]),
                                    div("result", [
                                    	ul({className: 'discipline-results'}, result$.map(discipline =>
                                    		li({className: 'discipline-result col-md-3'}, [
                                    			img({src: discipline.DiscImage, className: 'avatar img-responsive img-circle'}),
                                    			ul({className: 'discipline-results'}, [
                                    				li('.discipline', `Discipline: ${discipline.Discipline}`),
                                    				li('.sport', `Sport: ${discipline.SportID}`)
                                    			])
                                    			//a({href: result.html_url}, user.name)
                                    		])
                                    	))
                                    ])
				                //])
                            ])
                        ])
                    //)
                ),
     HTTP: request$   
	};
}

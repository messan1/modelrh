import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-template-nav',
  templateUrl: './template-nav.component.html',
  styleUrls: ['./template-nav.component.scss']
})
export class TemplateNavComponent implements OnInit {

  constructor(private router: Router,) { }
  params=false
  ngOnInit(): void {
    window.scroll(0,0);
    
  }

  openRoute(param:string){
  
  }
  changeRoute(param:string){
    if(param==="null"){
      param = this.router.url
      //this.router.navigate([param]);
    }else{
      this.router.navigate(['/'+param]);
    }
    this.ngOnInit()
  }
}

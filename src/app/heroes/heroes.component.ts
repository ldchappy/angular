import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	/**1111111111
	 * hero = 'windstorm' 是定义属性
	 * 这里是简单的定义属性
	 * @type {String}
	 */
	//hero = 'windstorm'

	/**222222222
	 * 这里有外部类定义hero时，
	 * 这里也要定义(这里是初始化定义)
	 * @type {[type]}
	 */
	/** 这是第3部分的代码
		hero:Hero = {
			id:1,
			name:'windstorm'
		};
	*/


	//3主从结构3添加heroes属性
	//heroes =  HEROES;

//把该组件的 hero 属性改名为 selectedHero，但不要为它赋值。 因为应用刚刚启动时并没有所选英雄。

	//selectedHero:Hero;

	//onSelect(hero:Hero):void{
	//	this.selectedHero = hero;
	//}

/**
 * 
 66 服务  66
 * @type {[type]}
 */

  selectedHero:Hero;

  heroes : Hero[];

  constructor(private heroService:HeroService) { }

  getHeroes():void{
    /**
     * 可观察数据之前(这种方法是同步的，现实中不可能)
     * this.heroes = this.heroService.getHeroes()
     * @type {[type]}
     */
    
    /**
     * 可观察数据,使用of之后，异步的
     */
  	this.heroService.getHeroes()
  		.subscribe(heroes => this.heroes = heroes);
  		
  }

  onSelect(hero:Hero):void{
	this.selectedHero = hero;
  }

  ngOnInit() {//放置初始化逻辑的好地方
  	this.getHeroes();
  }

}

import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

	/**
	 * hero = 'windstorm' 是定义属性
	 * 这里是简单的定义属性
	 * @type {String}
	 */
	//hero = 'windstorm'

	/**
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
	//添加heroes属性
	heroes =  HEROES;

//把该组件的 hero 属性改名为 selectedHero，但不要为它赋值。 因为应用刚刚启动时并没有所选英雄。

	selectedHero:Hero;

	onSelect(hero:Hero):void{
		this.selectedHero = hero;
	}

  constructor() { }

  ngOnInit() {//放置初始化逻辑的好地方
  }

}

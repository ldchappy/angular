import { Injectable } from '@angular/core';

//这里使用of模拟从服务器返回数据
import {Observable} from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { MessageService } from './message.service';


@Injectable()
export class HeroService {
	/**
	 * not is Observable
	 */
  //getHeroes():Hero[]{
	//return HEROES;
  //}

/**
 * is Observable
 */
  //getHeroes():Observable<Hero[]> {
  //  return Observable.of(HEROES);
  //}
  
  //constructor() { }

/**
 * 加入了message
 * 
 * @return {[type]}         [description]
 */
  constructor(private messageService:MessageService){}

  getHeroes():Observable<Hero[]> {
  	this.messageService.add('HeroService:fetched');
  	return Observable.of(HEROES);
  }

}

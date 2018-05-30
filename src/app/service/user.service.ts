import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../model/user.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/users';

  users: User[] = [
    new User(1, 'Dhiraj', 'Ray', 'dhiraj@gmail.com'),
    new User(2, 'James', 'Bond', 'JamesBond@gmail.com'),
    new User(3, 'Hary', 'Pan', 'hary@gmail.com'),
    new User(4, 'praks', 'pb',  'praks@gmail.com')
 ];

  getUsers() : User[] {
    return this.users;
  }

  getUserById(id: number) : User {
    let jMax: number = this.users.length;
    for( let j = 0; j < jMax; j++ ) {
      if( this.users[j].id === id ) {
        return this.users[j];
      }
    }
    return null;
    //return this.http.get<User>(this.baseUrl + '/' + id);
  }

  findUser(user: User) : User {
    this.users.forEach( function(testUser) {
      if( testUser.firstName.toUpperCase() === user.firstName.toUpperCase() &&
      testUser.lastName.toUpperCase() === user.lastName.toUpperCase() && 
      testUser.email.toUpperCase() === user.email.toUpperCase()) {
        return testUser;
      }
    });
    return null;
  }

  //@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
  //@requestmapping(value = "/loadAllCars")
  createUser (user: User) : string {
    let testUser: User = this.findUser(user);
    if( testUser != null) {
      return 'Already added: id is: ' + testUser.id.toString();
    }
    let newId : number = 1;
    let jMax : number = this.users.length;
    if( this.users.length > 0 ) {
      newId = this.users[jMax-1].id + 1;
    }
    let isUnique : boolean = false;
    while( isUnique === false) {
      isUnique = true;
      for( var j = 0; j < jMax; j++ ) {
        if( this.users[j].id == newId) {
          newId++;
          isUnique = false;
          break;
        }
      }
    }
    user.id = newId;
    this.users.push(user);
    return '';
    //return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) : string {
    let isFound : boolean = false;
    this.users.forEach( (item, index) => {
      if(item.id === user.id) {
        isFound = true;
        this.users[index] = user;
      }
    });
    if( isFound) {
      return '';
    }
    return 'User was not found';
    //return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser (id: number) : string {
    this.users.forEach( (item, index) => {
      if(item.id === id) {
        this.users.splice(index,1);
        return '';
      } 
    });
    return 'User not found.';
    //return this.http.delete(this.baseUrl + '/' + id);
  }
}

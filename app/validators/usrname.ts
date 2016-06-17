import {Control} from '@angular/common'

export class UsernameValidator {
  static checkUsername(control : Control){
    return new Promise(resolve => {
      // fake a slow from server
      setTimeout(() => {
        if (control.value.toLowerCase() === 'greg') {
          resolve({
            "username taken": true
          });

        } else {
          resolve(null);
        }
      }, 2000);

    });
  }
}

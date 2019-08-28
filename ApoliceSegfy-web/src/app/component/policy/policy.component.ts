import { Component, OnInit, TemplateRef } from '@angular/core';
import { Policy } from 'src/app/model/policy';
import { PolicyServiceService } from 'src/app/service/policyService.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policys: Policy[];
  policy: Policy;
  modalRef: BsModalRef;
  registerForm: FormGroup;

  constructor(private service: PolicyServiceService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getPolicys();
    this.validation();
  }

  getPolicys() {
    this.service.getPolicys().subscribe(
      response => {
        this.policys = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.registerForm.reset();
    this.modalRef = this.modalService.show(template);
  }

  validation() {
    this.registerForm = new FormGroup({
      id: new FormControl('', []),
      policyId: new FormControl('', Validators.required),
      document: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      board: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  SalvarAlteracoes(template: any) {
    if (this.registerForm.valid) {
      this.policy = Object.assign({}, this.registerForm.value);

      if (!this.policy.id) {
        this.policy.id = 0;
        this.service.postPolicy(this.policy).subscribe(
          (newPolicy: Policy) => {
            this.policy = null;
            this.getPolicys();
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.service.putPolicy(this.policy).subscribe(
          (newPolicy: Policy) => {
            this.policy = null;
            console.log(newPolicy);
            this.getPolicys();
          },
          error => {
            template.hide();
            console.error(error);
          }
        );
      }
    }
  }

  editar(policyObj: Policy, template: any) {
    this.openModal(template);
    this.policy = Object.assign({}, policyObj);
    this.registerForm.patchValue(this.policy);
  }

  novo(template: any) {
    this.openModal(template);
  }

  delete(policy: Policy) {
    this.service.deletePolicy(policy).subscribe(
      (newPolicy: Policy) => {
        console.log(newPolicy);
        this.getPolicys();
      },
      error => {
        console.log(error);
      }
    );
  }

}

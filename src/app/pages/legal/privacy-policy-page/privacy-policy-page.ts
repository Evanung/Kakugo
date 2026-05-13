import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {Avatar} from "primeng/avatar";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {StyleClass} from "primeng/styleclass";

@Component({
  selector: 'app-privacy-policy',
  imports: [
    RouterLink
  ],
  templateUrl: './privacy-policy-page.html',
  styleUrl: './privacy-policy-page.css',
})
export class PrivacyPolicyPage {}

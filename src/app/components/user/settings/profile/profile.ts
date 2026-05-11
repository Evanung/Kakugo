import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {FileUpload} from "primeng/fileupload";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {InputText} from "primeng/inputtext";
import {Textarea} from "primeng/textarea";

@Component({
  selector: 'app-profile',
    imports: [
        Button,
        FileUpload,
        InputGroup,
        InputGroupAddon,
        InputText,
        Textarea
    ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {}

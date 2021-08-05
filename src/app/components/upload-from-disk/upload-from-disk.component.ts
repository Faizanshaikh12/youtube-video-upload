import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {YoutubeUploadComponent} from "../youtube-upload/youtube-upload.component";

@Component({
  selector: 'app-upload-from-disk',
  templateUrl: './upload-from-disk.component.html',
  styleUrls: ['./upload-from-disk.component.css']
})
export class UploadFromDiskComponent implements OnInit {

  file: File;
  videoSelected = false;
  loading = false;
  isUploaded = false;
  url: string;

  @ViewChild('videoFile') nativeInputFile: ElementRef;
  @ViewChild('video') video: any;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  selectVideo(data) {
    this.videoSelected = true;
    if (navigator.userAgent.search('firefox')) {
      this.file = data.target.files[0];
    } else {
      this.file = data.srcElement.files[0];
    }
    this.video.nativeElement.src = window.URL.createObjectURL(this.file);
  }

  pickFile() {
    this.nativeInputFile.nativeElement.click();
  }

  youtubeSubmit() {
    const dialog = this.dialog.open(YoutubeUploadComponent, {
      data: {video: this.file}
    });
    dialog.updateSize('70%', '70%');
  }

}

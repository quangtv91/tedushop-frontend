import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
// const url = '//cdn.tinymce.com/4/tinymce.min.js';

@Component({
  selector: 'app-simple-tiny',
  templateUrl: './simple-tiny.component.html',
  styleUrls: ['./simple-tiny.component.css']
})
export class SimpleTinyComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();
  @Input() content: string;
  editor;

  constructor() { }

  ngOnInit() {
    // this.loadScript();
  }

  ngAfterViewInit() {
    if (tinymce) {
      tinymce.baseURL = "/assets/tinymce";
      tinymce.init({
        selector: '#' + this.elementId,
        language: 'vi_VN',
        skin_url: '/assets/tinymce/skins/lightgray',
        language_url: '/assets/tinymce/langs/vi_VN.js',
        plugins: "autosave autolink code codesample colorpicker emoticons fullscreen hr image imagetools media preview table textcolor wordcount",
        toolbar: "imageupload forecolor cut copy paste fontselect styleselect bold italic bold link preview code image",
        setup: editor => {
          this.editor = editor;
          editor.on('keyup', () => {
            const content = editor.getContent();
            this.onEditorKeyup.emit(content);
          });
          editor.on('init', () => {
            editor.setContent(this.content);
          });
        },
      });
    }
  }

  // loadScript() {
  //   let scriptTag = document.querySelector('script[src="//cdn.tinymce.com/4/tinymce.min.js"]');
  //   let node;
  //   if (!scriptTag) {
  //     node = document.createElement('script');
  //     node.src = url;
  //     node.type = 'text/javascript';
  //     node.async = true;
  //     node.charset = 'utf-8';
  //     document.getElementsByTagName('head')[0].appendChild(node);
  //   }
  // }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}

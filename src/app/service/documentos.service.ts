import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import base_url from './helper'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {
  

  constructor(private http: HttpClient) { }
  
  /**
   * get all the products
   */
  getProducts(){
    const endpoint = `${ base_url}/ListarDocumentos`;
    return this.http.get(endpoint);
  }

 
  getProductByName(name: any){
    const endpoint = `${ base_url}/buscarByText/${name}`;
    return this.http.get(endpoint);
  }

  getLibroByIdDcoument(id: any){
    const endpoint = `${ base_url}/buscarLibro/${id}`;
    return this.http.get(endpoint);
  }

  descargarDocumentos(uuid: any,id_doc:any,id_user:any): Observable<Blob> {
    const endpoint = `${base_url}/archivoPDF/${uuid}/${id_doc}/${id_user}`;
    return this.http.get(endpoint ,{ responseType: 'blob' });
  }
  /**
   * export excel products
   */
  exportProduct(){
    const endpoint = `${base_url}/products/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

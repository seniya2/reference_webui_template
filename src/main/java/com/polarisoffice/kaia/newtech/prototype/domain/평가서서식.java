package com.polarisoffice.kaia.newtech.prototype.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

public class 평가서서식 {

	public @Id @GeneratedValue Long id;

	public String 이름;
	
	
	@Transient
	public String createHtml(평가위원 p){
		return null;
	}
}

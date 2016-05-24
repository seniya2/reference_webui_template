 package com.polarisoffice.kaia.newtech.prototype.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.joda.time.DateTime;

public class 평가 {

	public @Id @GeneratedValue Long id;

	public String 년도;
	public DateTime 기간시작일;
	public DateTime 기간종료일;

	public String 이름;
	
	
	
	
	
}

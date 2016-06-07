package com.polarisoffice.kaia.newtech.prototype.domain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class NewTechType {
	
	public @Id @GeneratedValue Long id;
	
	public String title;	
	
}

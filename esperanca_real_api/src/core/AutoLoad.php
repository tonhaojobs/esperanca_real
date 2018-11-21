<?php

class AutoLoad {
    
    protected $ext;
    protected $prefix;
    protected $sufix;
	public $paths;
	
	
	public function __construct(array $paths){
		
		$this->paths = $paths;
	}

    public function setPath($path) {
        set_include_path($path);
    }

    public function setExt($ext) {
        $this->ext='.'.$ext;
    }
    
    public function setPrefix($prefix) {
        $this->prefix=$prefix;
    }

    public function setSufix($sufix) {
        $this->sufix=$sufix;
    }

    protected function setFilename($className) {
        $className = ltrim($className, '\\');
        $fileName  = '';
        $namespace = '';
        if ($lastNsPos = strrpos($className, '\\')) {
            $namespace = substr($className, 0, $lastNsPos);
            $className = substr($className, $lastNsPos + 1);
            $className = $this->prefix.$className.$this->sufix;
            $fileName  = str_replace('\\', DS, $namespace) . DS;
        }
        $fileName .= str_replace('_', DS, $className) . $this->ext;
        return $fileName;
    }
	
	public function loadFiles($className) {
		
		foreach($this->paths as $path) {
			
			$fileName = $this->setFilename($className);
			$fileName = $path . DS . $fileName;
		
			if (is_readable($fileName)) {
				//echo $fileName . "<br>";
				include $fileName;
			}
		}
	}

}
